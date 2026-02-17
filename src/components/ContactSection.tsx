import { useState, FormEvent } from "react";
import { MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";

const contactInfo = [
{
  icon: MapPin,
  title: "Adresse",
  content: "Trois Dimensions SA\nRue de l'Etang 25\n1630 Bulle, Suisse"
},
{
  icon: Mail,
  title: "Email",
  content: "contact@trois-dimensions.ch"
},
{
  icon: Clock,
  title: "Horaires",
  content: "Lun - Ven: 9h00 - 17h00"
}];


const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectType, setProjectType] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("type_projet", projectType);

    try {
      const res = await fetch("https://formspree.io/f/mgolkryb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        setIsSubmitted(true);
        form.reset();
        setProjectType("");
      }
    } catch {

      // silent fail
    } finally {setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container-swiss">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Contact
            </p>
            <h2 className="text-headline mb-6">
              Parlons de votre projet
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Que vous soyez investisseur, propriétaire foncier ou à la recherche 
              de votre futur bien immobilier, notre équipe est à votre écoute.
            </p>

            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-forest/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary p-8 md:p-10">
            <h3 className="text-xl font-bold mb-6">Envoyez-nous un message</h3>

            {isSubmitted ?
            <div className="flex items-center justify-center min-h-[300px]">
                <p className="text-lg font-medium text-forest text-center">
                  ✅ Votre message a été envoyé avec succès !
                </p>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="contact-name">Nom complet *</Label>
                  <Input
                  id="contact-name"
                  name="nom"
                  required
                  maxLength={200}
                  className="mt-1.5 bg-background" />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    maxLength={255}
                    className="mt-1.5 bg-background" />

                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Téléphone *</Label>
                    <Input
                    id="contact-phone"
                    type="tel"
                    name="telephone"
                    required
                    className="mt-1.5 bg-background" />

                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-project">Type de projet</Label>
                  <Select
                  value={projectType}
                  onValueChange={setProjectType}>

                    <SelectTrigger className="mt-1.5 bg-background">
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="achat">Achat d'un bien</SelectItem>
                      <SelectItem value="valorisation">Valorisation foncière</SelectItem>
                      <SelectItem value="investissement">Investissement</SelectItem>
                      <SelectItem value="partenariat">Partenariat</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="type_projet" value={projectType} />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={5000}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="mt-1.5 bg-background min-h-[120px]" />

                </div>
                <Button type="submit" variant="forest" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>);

};

export default ContactSection;