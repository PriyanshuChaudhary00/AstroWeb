import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const isAdmin = user?.email?.endsWith("@admin.divine") || user?.email === "admin@example.com";

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    window.location.href = "/api/login";
    return null;
  }

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.email}</h1>
              {isAdmin && <p className="text-accent font-semibold">Admin Account</p>}
            </div>
          </div>

          <div className="space-y-4 mb-6 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-semibold">{user.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="font-semibold">{isAdmin ? "Administrator" : "Customer"}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {isAdmin && (
              <Button onClick={() => window.location.href = "/admin"} variant="default">
                Go to Admin Dashboard
              </Button>
            )}
            <Button onClick={handleLogout} variant="destructive" className="ml-auto">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
