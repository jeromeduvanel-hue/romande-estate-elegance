import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container-swiss py-24 md:py-32 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-10">Mentions légales</h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Éditeur du site</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trois Dimensions SA<br />
              Rue de l'Etang 25<br />
              1630 Bulle, Suisse
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Forme juridique : Société Anonyme (SA) de droit suisse<br />
              Inscrite au Registre du Commerce du Canton de Fribourg
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Responsable de la publication</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trois Dimensions SA
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Hébergement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ce site est hébergé par Lovable.<br />
              Les données sont stockées sur des serveurs sécurisés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Trois Dimensions SA ou de ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès écrit de Trois Dimensions SA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Limitation de responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les informations contenues sur ce site sont aussi précises que possible et sont régulièrement mises à jour. Toutefois, elles peuvent contenir des inexactitudes ou des omissions. Trois Dimensions SA ne saurait être tenue responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation des informations qui y sont contenues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Liens hypertextes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le site peut contenir des liens vers d'autres sites. Trois Dimensions SA n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques en matière de protection des données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Droit applicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes mentions légales sont régies par le droit suisse. Tout litige relatif à l'utilisation de ce site sera soumis à la juridiction des tribunaux compétents du Canton de Fribourg, Suisse.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default MentionsLegales;
