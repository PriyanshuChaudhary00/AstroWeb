import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockAuth, type MockUser } from "./mockAuth";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current user from mock auth (localStorage)
        const currentUser = await mockAuth.getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const newUser = await mockAuth.signUp(email, password);
      setUser({
        id: newUser.id,
        email: newUser.email
      });
    } catch (error: any) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const authenticatedUser = await mockAuth.signIn(email, password);
      setUser({
        id: authenticatedUser.id,
        email: authenticatedUser.email
      });
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await mockAuth.signOut();
      setUser(null);
    } catch (error: any) {
      throw error;
    }
  };

  const isAdmin = user?.email === "admin@example.com" || user?.email?.endsWith("@admin.divine");

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
