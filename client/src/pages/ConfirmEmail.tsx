import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ConfirmEmail() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Get the hash from URL which contains the token
        const hash = window.location.hash;
        
        if (!hash) {
          setStatus("error");
          setMessage("No confirmation token found. Please check your email link.");
          return;
        }

        // Supabase automatically processes the hash when page loads
        // The session will be updated if valid
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          setStatus("error");
          setMessage("Email confirmation failed. The link may have expired. Please sign up again.");
          return;
        }

        if (user.email_confirmed_at) {
          setStatus("success");
          setMessage("Email confirmed successfully! Redirecting to your profile...");
          setTimeout(() => navigate("/profile"), 2000);
        } else {
          setStatus("error");
          setMessage("Email confirmation failed. Please try again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during email confirmation. Please try again.");
        console.error("Confirmation error:", error);
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <h1 className="text-2xl font-bold">Confirming Your Email</h1>
              <p className="text-muted-foreground">Please wait while we verify your email address...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <h1 className="text-2xl font-bold">Email Confirmed!</h1>
              <p className="text-muted-foreground">{message}</p>
              <Button onClick={() => navigate("/profile")} className="w-full mt-4">
                Go to Profile
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="w-12 h-12 text-red-600" />
              <h1 className="text-2xl font-bold">Confirmation Failed</h1>
              <p className="text-muted-foreground">{message}</p>
              <div className="flex flex-col gap-2 w-full mt-4">
                <Button onClick={() => navigate("/signup")} variant="outline" className="w-full">
                  Sign Up Again
                </Button>
                <Button onClick={() => navigate("/login")} className="w-full">
                  Go to Login
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
