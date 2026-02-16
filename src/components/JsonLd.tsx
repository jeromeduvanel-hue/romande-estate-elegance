const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Trois Dimensions SA",
    "description": "Promoteur immobilier en Suisse Romande. Développement, construction et valorisation de projets immobiliers de qualité.",
    "url": "https://trois-dimensions.ch",
    "logo": "https://trois-dimensions.ch/logo-trois-dimensions.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue de l'Etang 25",
      "addressLocality": "Bulle",
      "postalCode": "1630",
      "addressCountry": "CH"
    },
    "email": "contact@trois-dimensions.ch",
    "telephone": "+41269139391",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Suisse Romande"
    },
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;
