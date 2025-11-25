import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, isAdmin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully"
      });
      
      // Redirect based on user type
      if (email === "admin@example.com" || email.endsWith("@admin.divine")) {
        setTimeout(() => setLocation("/admin"), 500);
      } else {
        setTimeout(() => setLocation("/"), 500);
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4 py-20">
      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-card/80">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-accent" />
            <h1 className="font-serif text-2xl font-bold">Divine Astrology</h1>
          </div>
          <p className="text-muted-foreground">Login to Your Account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              data-testid="input-login-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              data-testid="input-login-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-testid="button-login"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <div className="text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => setLocation("/signup")}
                className="text-accent hover:underline font-semibold"
                data-testid="link-to-signup"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Admin Credentials:</p>
            <p className="text-xs">Email: veernandan00u@gmail.com</p>
            <p className="text-xs">Password: veer1234</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
