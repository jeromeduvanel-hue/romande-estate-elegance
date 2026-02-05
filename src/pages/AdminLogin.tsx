import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoLight from "@/assets/logo-trois-dimensions.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        throw new Error("Accès non autorisé. Vous n'êtes pas administrateur.");
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur.",
      });
      navigate("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`,
        },
      });

      if (error) throw error;

      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte, puis contactez l'administrateur pour activer votre accès.",
      });
      setIsSignUp(false);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur s'est produite lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-background p-8 shadow-lg">
          <div className="flex justify-center mb-8">
            <img src={logoLight} alt="Trois Dimensions" className="h-12" />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">
            {isSignUp ? "Créer un compte" : "Espace Administrateur"}
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            {isSignUp 
              ? "Inscrivez-vous pour demander l'accès administrateur"
              : "Connectez-vous pour accéder aux demandes"
            }
          </p>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
                placeholder="admin@trois-dimensions.ch"
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              variant="forest"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading 
                ? (isSignUp ? "Inscription..." : "Connexion...") 
                : (isSignUp ? "S'inscrire" : "Se connecter")
              }
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp 
                ? "Déjà un compte ? Se connecter"
                : "Pas encore de compte ? S'inscrire"
              }
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Retour au site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
