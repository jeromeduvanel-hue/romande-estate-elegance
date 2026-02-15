import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const benefits = ["Estimation gratuite de votre bien", "Étude de faisabilité complète", "Accompagnement juridique et fiscal", "Solutions de financement sur mesure"];

const ValorisationSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          type: "valorisation",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message
        }
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée",
        description: "Un expert vous contactera dans les 48h pour planifier une analyse."
      });
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending request:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="valorisation" className="py-24 md:py-32 bg-foreground text-background">
      <div className="container-swiss">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-background/50 mb-4">
              Valorisation Foncière
            </p>
            <h2 className="text-headline text-background mb-6">
              Propriétaires :
              <br />
              Valorisez votre patrimoine
            </h2>
            <p className="text-lg text-background/70 mb-8 leading-relaxed">
              Vous possédez un terrain ou un bien immobilier en Suisse Romande ? 
              Notre équipe d'experts vous accompagne pour maximiser la valeur de votre patrimoine 
              à travers un projet de développement sur mesure.
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-forest flex-shrink-0" />
                  <span className="text-background/80">{benefit}</span>
                </li>)}
            </ul>

            <Button variant="hero" size="lg" onClick={() => setShowForm(true)} className="group">
              Demander une analyse foncière
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats Card */}
          <div className="bg-background/5 border border-background/10 p-8 md:p-12">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-5xl md:text-6xl font-bold text-background mb-2">15+</p>
                <p className="text-background/60 text-sm">Années d'expertise</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-background mb-2">12+</p>
                <p className="text-background/60 text-sm">Projets réalisés</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-background mb-2">98%</p>
                <p className="text-background/60 text-sm">Clients satisfaits</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-forest mb-2">CHF</p>
                <p className="text-background/60 text-sm">54M+ développés</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Demande d'analyse foncière
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-6">
            Décrivez votre bien et un expert vous contactera pour une analyse personnalisée.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="analysis-name">Nom complet</Label>
                <Input id="analysis-name" value={formData.name} onChange={(e) => setFormData({
                ...formData,
                name: e.target.value
              })} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="analysis-phone">Téléphone</Label>
                <Input id="analysis-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({
                ...formData,
                phone: e.target.value
              })} required className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="analysis-email">Email</Label>
              <Input id="analysis-email" type="email" value={formData.email} onChange={(e) => setFormData({
              ...formData,
              email: e.target.value
            })} required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="analysis-address">Adresse du bien</Label>
              <Input id="analysis-address" value={formData.address} onChange={(e) => setFormData({
              ...formData,
              address: e.target.value
            })} placeholder="Rue, NPA, Ville" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="analysis-message">Description (optionnel)</Label>
              <Textarea id="analysis-message" value={formData.message} onChange={(e) => setFormData({
              ...formData,
              message: e.target.value
            })} placeholder="Type de bien, surface, zone, etc." className="mt-1.5 min-h-[100px]" />
            </div>
            <Button type="submit" variant="forest" size="lg" className="w-full mt-6" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>;
};
export default ValorisationSection;