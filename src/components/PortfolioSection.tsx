import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

interface Project {
  id: number;
  title: string;
  location: string;
  type: string;
  units: string;
  status: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Les Terrasses du Lac",
    location: "Montreux, VD",
    type: "Résidentiel de luxe",
    units: "12 appartements",
    status: "En construction",
    image: project1,
    description: "Un projet d'exception surplombant le lac Léman, alliant architecture contemporaine et matériaux nobles. Chaque appartement bénéficie d'une vue panoramique sur les Alpes.",
  },
  {
    id: 2,
    title: "Résidence Horizon",
    location: "Genève, GE",
    type: "Résidentiel standing",
    units: "24 appartements",
    status: "Livré",
    image: project2,
    description: "Au cœur de Genève, cette résidence incarne l'élégance contemporaine. Finitions haut de gamme et prestations premium pour une clientèle exigeante.",
  },
  {
    id: 3,
    title: "Villa Verde",
    location: "Lausanne, VD",
    type: "Éco-construction",
    units: "8 villas",
    status: "En vente",
    image: project3,
    description: "Premier projet certifié Minergie-P® de notre portfolio. Architecture bioclimatique intégrée dans un écrin de verdure, pour un habitat durable.",
  },
  {
    id: 4,
    title: "Le Hameau",
    location: "Nyon, VD",
    type: "Villas individuelles",
    units: "6 villas",
    status: "Étude",
    image: project4,
    description: "Six villas d'architecte nichées dans un cadre bucolique. Design épuré, volumes généreux et jardins paysagers privatifs.",
  },
];

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const { toast } = useToast();

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Vous recevrez la brochure par email dans les plus brefs délais.",
    });
    setShowBrochureForm(false);
    setSelectedProject(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <section id="projets" className="py-24 md:py-32 bg-background">
      <div className="container-swiss">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
            Portfolio
          </p>
          <h2 className="text-headline mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Nos réalisations
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            Chaque projet reflète notre engagement pour l'excellence architecturale 
            et notre expertise du marché immobilier romand.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden bg-secondary aspect-[4/3] text-left animate-fade-up opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block text-xs uppercase tracking-wider text-background/70 mb-2">
                  {project.status}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-background mb-1">
                  {project.title}
                </h3>
                <p className="text-background/80 text-sm">
                  {project.location} · {project.units}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="h-6 w-6 text-background" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject && !showBrochureForm} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedProject && (
            <>
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-colors"
                >
                  <X className="h-5 w-5 text-background" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-wider text-forest font-medium px-3 py-1 bg-forest/10 rounded-full">
                    {selectedProject.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {selectedProject.type}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {selectedProject.location} · {selectedProject.units}
                </p>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="forest"
                    size="lg"
                    onClick={() => setShowBrochureForm(true)}
                  >
                    Télécharger la brochure
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Nous contacter
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Brochure Form Dialog */}
      <Dialog open={showBrochureForm} onOpenChange={() => setShowBrochureForm(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Télécharger la brochure
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm mb-6">
            Remplissez ce formulaire pour recevoir la brochure complète du projet 
            <span className="font-medium text-foreground"> {selectedProject?.title}</span>.
          </p>
          <form onSubmit={handleBrochureSubmit} className="space-y-4">
            <div>
              <Label htmlFor="brochure-name">Nom complet</Label>
              <Input
                id="brochure-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="brochure-email">Email</Label>
              <Input
                id="brochure-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="brochure-phone">Téléphone</Label>
              <Input
                id="brochure-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <Button type="submit" variant="forest" size="lg" className="w-full mt-6">
              Recevoir la brochure
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
