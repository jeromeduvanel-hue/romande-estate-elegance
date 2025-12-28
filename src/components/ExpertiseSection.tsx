import { Building2, Landmark, Shield, TrendingUp, Users, Wallet } from "lucide-react";

const expertise = [
  {
    icon: Building2,
    title: "Développement",
    description: "De l'acquisition foncière à la commercialisation, nous pilotons chaque étape de vos projets.",
  },
  {
    icon: TrendingUp,
    title: "Valorisation",
    description: "Optimisation du potentiel constructible et maximisation de la valeur de votre patrimoine.",
  },
  {
    icon: Wallet,
    title: "Financement",
    description: "Structuration financière et recherche de partenaires pour des projets de toute envergure.",
  },
  {
    icon: Shield,
    title: "Conformité",
    description: "Maîtrise des procédures administratives et respect des normes suisses les plus strictes.",
  },
  {
    icon: Users,
    title: "Partenariats",
    description: "Réseau étendu d'architectes, entrepreneurs et artisans d'excellence en Suisse Romande.",
  },
  {
    icon: Landmark,
    title: "Patrimoine",
    description: "Expertise en rénovation et valorisation de biens historiques et patrimoniaux.",
  },
];

const partners = [
  "Banque Cantonale Vaudoise",
  "Credit Suisse",
  "UBS",
  "Raiffeisen",
  "Swiss Life",
  "Mobilière",
];

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-24 md:py-32 bg-secondary">
      <div className="container-swiss">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Notre Expertise
          </p>
          <h2 className="text-headline mb-6">
            Un savoir-faire reconnu
          </h2>
          <p className="text-lg text-muted-foreground">
            Plus de 15 ans d'expérience dans le développement immobilier en Suisse Romande, 
            au service de projets d'exception.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {expertise.map((item, index) => (
            <div
              key={index}
              className="group p-8 bg-background hover:bg-forest transition-colors duration-500"
            >
              <item.icon className="h-8 w-8 mb-6 text-forest group-hover:text-background transition-colors duration-500" />
              <h3 className="text-xl font-bold mb-3 group-hover:text-background transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-background/80 transition-colors duration-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="border-t border-border pt-16">
          <p className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Nos partenaires de confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-lg md:text-xl font-medium text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
