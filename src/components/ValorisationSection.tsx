import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RECAPTCHA_SITE_KEY = "6Le8kG4sAAAAAHx5wR1daVJYycSwkbiopILeNk2O";

const benefits = ["Estimation gratuite de votre bien", "Étude de faisabilité complète", "Accompagnement juridique et fiscal", "Solutions de financement sur mesure"];

const ValorisationSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [state, handleSubmit, reset] = useForm("mgolkryb");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = (open: boolean) => {
    if (!open) {
      setShowForm(false);
      if (state.succeeded) reset();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
      const form = e.currentTarget;
      const hiddenInput = form.querySelector('input[name="g-recaptcha-response"]') as HTMLInputElement;
      if (hiddenInput) hiddenInput.value = token;
      await handleSubmit(e);
    } catch (err) {
      console.error("reCAPTCHA error:", err);
    } finally {
      setSubmitting(false);
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
                <p className="text-5xl md:text-6xl font-bold text-background mb-2">2</p>
                <p className="text-background/60 text-sm">Projets réalisés en 2025</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-background mb-2">1 mois</p>
                <p className="text-background/60 text-sm">Délai moyen pour un avant projet</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-forest mb-2">FR-VD</p>
                <p className="text-background/60 text-sm">Notre coeur d'activité</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Form Dialog */}
      <Dialog open={showForm} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Demande d'analyse foncière
            </DialogTitle>
          </DialogHeader>

          {state.succeeded ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <p className="text-lg font-medium text-forest text-center">
                ✅ Votre demande a été envoyée avec succès !
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground text-sm mb-6">
                Décrivez votre bien et un expert vous contactera pour une analyse personnalisée.
              </p>
              <form onSubmit={onSubmit} className="space-y-4">
                <input type="hidden" name="g-recaptcha-response" value="" />
                <input type="hidden" name="type_demande" value="Analyse foncière" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="analysis-name">Nom complet</Label>
                    <Input id="analysis-name" name="nom" required maxLength={200} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="analysis-phone">Téléphone</Label>
                    <Input id="analysis-phone" type="tel" name="telephone" required className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="analysis-email">Email</Label>
                  <Input id="analysis-email" type="email" name="email" required maxLength={255} className="mt-1.5" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div>
                  <Label htmlFor="analysis-address">Adresse du bien</Label>
                  <Input id="analysis-address" name="adresse_bien" placeholder="Rue, NPA, Ville" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="analysis-message">Description (optionnel)</Label>
                  <Textarea id="analysis-message" name="message" placeholder="Type de bien, surface, zone, etc." className="mt-1.5 min-h-[100px]" maxLength={5000} />
                </div>
                <Button type="submit" variant="forest" size="lg" className="w-full mt-6" disabled={submitting || state.submitting}>
                  {submitting || state.submitting ? "Envoi en cours..." : "Envoyer la demande"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>;
};
export default ValorisationSection;
