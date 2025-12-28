import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-architecture.jpg";

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.querySelector("#projets");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Architecture moderne suisse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-swiss text-center pt-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-background/70 mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Promoteur Immobilier
          </p>
          
          <h1 className="text-display text-background mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
            Bâtir l'excellence
            <br />
            en Suisse Romande
          </h1>
          
          <p className="text-subheadline text-background/80 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
            Développement immobilier et construction de projets résidentiels d'exception. 
            De l'étude de faisabilité à la livraison clé en main.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToProjects}
            >
              Découvrir nos projets
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => document.querySelector("#valorisation")?.scrollIntoView({ behavior: "smooth" })}
            >
              Valoriser mon terrain
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 hover:text-background transition-colors duration-300 animate-bounce"
        aria-label="Scroll to projects"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default HeroSection;
