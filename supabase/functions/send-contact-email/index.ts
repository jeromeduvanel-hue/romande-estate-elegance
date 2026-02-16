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
    const sanitizedMessage = data.message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>");
    content += `
        <div style="margin-top: 20px;">
          <p style="font-weight: bold; margin-bottom: 10px;">Message :</p>
          <div style="background-color: #ffffff; padding: 15px; border: 1px solid #e0e0e0; border-radius: 4px;">
            ${sanitizedMessage}
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

const sanitizeInput = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Méthode non autorisée" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
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

    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(JSON.stringify({ success: false, error: "JSON invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const data = rawData as ContactRequest;

    // Validate required fields
    if (!data.name || !data.email || !data.type) {
      return new Response(JSON.stringify({ success: false, error: "Champs requis manquants" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate types
    const validTypes = ["contact", "valorisation", "brochure"];
    if (!validTypes.includes(data.type)) {
      return new Response(JSON.stringify({ success: false, error: "Type invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate lengths
    if (data.name.length > 200 || data.email.length > 255 || (data.message && data.message.length > 5000)) {
      return new Response(JSON.stringify({ success: false, error: "Données trop longues" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      return new Response(JSON.stringify({ success: false, error: "Email invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize all string inputs for the email HTML
    const sanitizedData: ContactRequest = {
      type: data.type,
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: data.phone ? sanitizeInput(data.phone) : undefined,
      message: data.message ? data.message.trim().slice(0, 5000) : undefined,
      projectType: data.projectType ? sanitizeInput(data.projectType) : undefined,
      address: data.address ? sanitizeInput(data.address) : undefined,
      projectTitle: data.projectTitle ? sanitizeInput(data.projectTitle) : undefined,
    };

    // Insert lead into database (use raw trimmed data for DB)
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        type: data.type,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        message: data.message?.trim().slice(0, 5000) || null,
        project_type: data.projectType?.trim() || null,
        address: data.address?.trim() || null,
        project_title: data.projectTitle?.trim() || null,
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
    // IMPORTANT: You must verify trois-dimensions.ch domain at resend.com/domains
    // then update the 'from' address to use your verified domain
    const emailResponse = await resend.emails.send({
      from: "Trois Dimensions <noreply@trois-dimensions.ch>",
      to: ["contact@trois-dimensions.ch"],
      subject: getEmailSubject(sanitizedData.type, sanitizedData.name),
      html: getEmailHtml(sanitizedData),
      reply_to: sanitizedData.email,
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
