import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  type: "contact" | "valorisation" | "brochure";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  projectType?: string;
  address?: string;
  projectTitle?: string;
}

const getEmailSubject = (type: string, name: string): string => {
  switch (type) {
    case "contact":
      return `Nouveau message de contact - ${name}`;
    case "valorisation":
      return `Demande d'analyse foncière - ${name}`;
    case "brochure":
      return `Demande de brochure - ${name}`;
    default:
      return `Nouvelle demande - ${name}`;
  }
};

const getEmailHtml = (data: ContactRequest): string => {
  const typeLabels: Record<string, string> = {
    contact: "Message de contact",
    valorisation: "Demande d'analyse foncière",
    brochure: "Demande de brochure",
  };

  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Trois Dimensions</h1>
      </div>
      <div style="background-color: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0;">
        <h2 style="color: #1a1a1a; margin-top: 0;">${typeLabels[data.type] || "Nouvelle demande"}</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 140px;">Nom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
              <a href="mailto:${data.email}" style="color: #2d5a27;">${data.email}</a>
            </td>
          </tr>
  `;

  if (data.phone) {
    content += `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Téléphone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
              <a href="tel:${data.phone}" style="color: #2d5a27;">${data.phone}</a>
            </td>
          </tr>
    `;
  }

  if (data.projectType) {
    content += `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Type de projet</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.projectType}</td>
          </tr>
    `;
  }

  if (data.address) {
    content += `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Adresse du bien</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.address}</td>
          </tr>
    `;
  }

  if (data.projectTitle) {
    content += `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Projet</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.projectTitle}</td>
          </tr>
    `;
  }

  content += `
        </table>
  `;

  if (data.message) {
    content += `
        <div style="margin-top: 20px;">
          <p style="font-weight: bold; margin-bottom: 10px;">Message :</p>
          <div style="background-color: #ffffff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 4px;">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        </div>
    `;
  }

  content += `
      </div>
      <div style="background-color: #1a1a1a; padding: 15px; text-align: center;">
        <p style="color: #888888; margin: 0; font-size: 12px;">
          Cet email a été envoyé automatiquement depuis le site trois-dimensions.ch
        </p>
      </div>
    </div>
  `;

  return content;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Configuration email manquante");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Supabase credentials missing");
      throw new Error("Configuration base de données manquante");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const resend = new Resend(RESEND_API_KEY);

    const data: ContactRequest = await req.json();
    console.log("Received data:", JSON.stringify(data));

    // Validate required fields
    if (!data.name || !data.email || !data.type) {
      throw new Error("Champs requis manquants: nom, email et type");
    }

    // Insert lead into database
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        project_type: data.projectType || null,
        address: data.address || null,
        project_title: data.projectTitle || null,
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Erreur lors de l'enregistrement de la demande");
    }

    console.log("Lead saved to database:", lead.id);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Trois Dimensions <onboarding@resend.dev>",
      to: ["contact@trois-dimensions.ch"],
      subject: getEmailSubject(data.type, data.name),
      html: getEmailHtml(data),
      reply_to: data.email,
    });

    console.log("Email sent:", emailResponse);

    // Update lead to mark email as sent
    const emailData = emailResponse.data;
    if (emailData?.id) {
      await supabase
        .from("leads")
        .update({ email_sent: true })
        .eq("id", lead.id);
      console.log("Lead updated with email_sent = true");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: lead.id,
        emailId: emailData?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
