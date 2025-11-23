import { type Request, type Response, type NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin email addresses
const ADMIN_EMAILS = ["veernandan00u@gmail.com", "admin@example.com"];
const ADMIN_DOMAINS = ["@admin.divine"];

const isAdminEmail = (email: string | undefined) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email) || ADMIN_DOMAINS.some(domain => email.endsWith(domain));
};

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

// Middleware to verify JWT and extract user info
export async function verifyAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.substring(7);

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user || !user.email) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email,
      isAdmin: isAdminEmail(user.email)
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
}

// Middleware to check if user is admin
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Admin access required. Only veernandan00u@gmail.com can perform this action." });
  }
  next();
}
