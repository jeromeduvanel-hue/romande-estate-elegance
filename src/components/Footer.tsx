import logo from "@/assets/logo-trois-dimensions.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-swiss">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="#" className="inline-block">
              <img src={logo} alt="Trois Dimensions SA" className="h-12 w-auto" />
            </a>
            <p className="mt-4 text-background/60 max-w-md leading-relaxed">Promoteur immobilier en Suisse Romande. Développement, construction et valorisation de projets résidentiels de qualité. 


            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("#projets")}
                  className="text-background/60 hover:text-background transition-colors text-sm">

                  Nos projets
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#valorisation")}
                  className="text-background/60 hover:text-background transition-colors text-sm">

                  Valorisation foncière
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#expertise")}
                  className="text-background/60 hover:text-background transition-colors text-sm">

                  Notre expertise
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="text-background/60 hover:text-background transition-colors text-sm">

                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
                  CGV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-sm">
            © {currentYear} Trois Dimensions SA. Tous droits réservés.
          </p>
          <p className="text-background/40 text-sm">
            Bulle, Suisse
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;