import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoLight from "@/assets/logo-trois-dimensions.png";

interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  project_type: string | null;
  address: string | null;
  project_title: string | null;
  email_sent: boolean;
  created_at: string;
}

const typeLabels: Record<string, string> = {
  contact: "Contact",
  valorisation: "Valorisation",
  brochure: "Brochure",
};

const typeColors: Record<string, string> = {
  contact: "bg-blue-500/10 text-blue-700",
  valorisation: "bg-forest/10 text-forest",
  brochure: "bg-purple-500/10 text-purple-700",
};

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchLeads();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    // Verify admin role
    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (error || !roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes.",
        variant: "destructive",
      });
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) return;

    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la demande.",
        variant: "destructive",
      });
    } else {
      setLeads(leads.filter((l) => l.id !== id));
      toast({
        title: "Demande supprimée",
        description: "La demande a été supprimée avec succès.",
      });
    }
  };

  const filteredLeads = filterType === "all" 
    ? leads 
    : leads.filter((l) => l.type === filterType);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoLight} alt="Trois Dimensions" className="h-8" />
            <span className="text-sm text-muted-foreground">Administration</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Demandes reçues</h1>
            <p className="text-muted-foreground">
              {filteredLeads.length} demande{filteredLeads.length > 1 ? "s" : ""}
            </p>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les demandes</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="valorisation">Valorisation</SelectItem>
              <SelectItem value="brochure">Brochure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="bg-background p-8 text-center">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-background p-8 text-center">
            <p className="text-muted-foreground">Aucune demande pour le moment.</p>
          </div>
        ) : (
          <div className="bg-background rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Détails</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Badge className={typeColors[lead.type] || "bg-gray-100 text-gray-800"}>
                        {typeLabels[lead.type] || lead.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <a href={`mailto:${lead.email}`} className="text-forest hover:underline">
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <a href={`tel:${lead.phone}`} className="hover:underline">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs space-y-1">
                        {lead.project_type && (
                          <p className="text-sm text-muted-foreground">
                            Projet: {lead.project_type}
                          </p>
                        )}
                        {lead.address && (
                          <div className="flex items-start gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                            <span className="text-muted-foreground">{lead.address}</span>
                          </div>
                        )}
                        {lead.project_title && (
                          <p className="text-sm text-muted-foreground">
                            {lead.project_title}
                          </p>
                        )}
                        {lead.message && (
                          <p className="text-sm line-clamp-2" title={lead.message}>
                            {lead.message}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.email_sent ? (
                        <div className="flex items-center gap-1 text-forest">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs">Envoyé</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-orange-600">
                          <XCircle className="h-4 w-4" />
                          <span className="text-xs">Non envoyé</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(lead.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(lead.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
