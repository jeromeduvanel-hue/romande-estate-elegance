import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PolitiqueConfidentialite = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container-swiss py-24 md:py-32 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-10">Politique de confidentialité</h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trois Dimensions SA accorde une grande importance à la protection de vos données personnelles. La présente politique de confidentialité décrit les données que nous collectons, la manière dont nous les utilisons et les droits dont vous disposez. Elle est conforme à la Loi fédérale suisse sur la protection des données (LPD) révisée, entrée en vigueur le 1er septembre 2023, ainsi qu'au Règlement général sur la protection des données (RGPD) de l'Union européenne.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Responsable du traitement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trois Dimensions SA<br />
              Rue de l'Etang 25<br />
              1630 Bulle, Suisse<br />
              E-mail : info@troisdimensions.ch
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Données collectées</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous collectons les données personnelles suivantes lorsque vous utilisez notre formulaire de contact :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Message et toute information que vous choisissez de nous communiquer</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Des données techniques (adresse IP, type de navigateur, pages consultées) peuvent être collectées automatiquement lors de votre visite sur le site à des fins de sécurité et d'amélioration du service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Finalités du traitement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données personnelles sont traitées pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Répondre à vos demandes de contact et de renseignements</li>
              <li>Gérer notre relation commerciale</li>
              <li>Assurer le bon fonctionnement et la sécurité du site</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Base juridique</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le traitement de vos données repose sur votre consentement (soumission du formulaire de contact), l'exécution de mesures précontractuelles ou notre intérêt légitime à gérer nos activités commerciales, conformément à la LPD et au RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Durée de conservation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données personnelles sont conservées aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, et au maximum pendant la durée requise par les obligations légales applicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Transfert de données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données peuvent être hébergées sur des serveurs situés en dehors de la Suisse. Dans ce cas, nous veillons à ce que le transfert soit assorti de garanties appropriées conformément à la LPD et au RGPD.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Vos données ne sont en aucun cas vendues à des tiers. Elles peuvent être partagées avec des prestataires de services dans la mesure nécessaire au fonctionnement du site et au traitement de vos demandes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Vos droits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conformément à la LPD et au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>Droit d'accès :</strong> obtenir la confirmation du traitement de vos données et en recevoir une copie</li>
              <li><strong>Droit de rectification :</strong> demander la correction de données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré et lisible</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Pour exercer vos droits, contactez-nous à l'adresse : info@troisdimensions.ch
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de suivi n'est utilisé sans votre consentement préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Autorité de surveillance</h2>
            <p className="text-muted-foreground leading-relaxed">
              En cas de litige concernant le traitement de vos données, vous pouvez vous adresser au Préposé fédéral à la protection des données et à la transparence (PFPDT) en Suisse, ou à l'autorité de protection des données compétente de votre pays de résidence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Modification de la politique</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trois Dimensions SA se réserve le droit de modifier la présente politique de confidentialité à tout moment. La version en vigueur est celle publiée sur ce site. Dernière mise à jour : février 2026.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PolitiqueConfidentialite;
