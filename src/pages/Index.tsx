import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ValorisationSection from "@/components/ValorisationSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Trois Dimensions SA | Promoteur Immobilier en Suisse Romande"
        description="Promoteur immobilier d'excellence en Suisse Romande. Développement, construction et valorisation de projets résidentiels haut de gamme."
        canonical="https://trois-dimensions.ch"
      />
      <JsonLd />
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ValorisationSection />
        <ExpertiseSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
