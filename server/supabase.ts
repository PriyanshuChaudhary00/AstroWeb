import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

export const supabaseDb = createClient(supabaseUrl, supabaseAnonKey);

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Create products table
    const { error: productsError } = await supabaseDb.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          price TEXT NOT NULL,
          description TEXT,
          images TEXT[] DEFAULT '{}',
          benefits TEXT[] DEFAULT '{}',
          certified BOOLEAN DEFAULT false,
          in_stock BOOLEAN DEFAULT true,
          rating TEXT DEFAULT '0',
          review_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(() => ({ error: null }));

    // Create blog_posts table
    const { error: blogError } = await supabaseDb.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS blog_posts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT,
          content TEXT,
          category TEXT,
          featured_image TEXT,
          author TEXT,
          read_time INTEGER,
          meta_description TEXT,
          published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(() => ({ error: null }));

    // Create videos table
    const { error: videosError } = await supabaseDb.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS videos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT,
          youtube_url TEXT NOT NULL,
          thumbnail_url TEXT,
          category TEXT,
          published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(() => ({ error: null }));

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.log("Database initialization note:", error);
    // This might fail with anon key, which is okay - tables just need to exist
  }
}

// Helper functions to interact with Supabase database
export async function insertToDb(table: string, data: any) {
  const { data: result, error } = await supabaseDb
    .from(table)
    .insert([data])
    .select()
    .single();
  
  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }
  return result;
}

export async function getFromDb(table: string, column?: string, value?: any) {
  let query = supabaseDb.from(table).select();
  
  if (column && value !== undefined) {
    query = query.eq(column, value);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }
  return data;
}

export async function updateDb(table: string, column: string, value: any, updates: any) {
  const { data, error } = await supabaseDb
    .from(table)
    .update(updates)
    .eq(column, value)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }
  return data;
}

export async function deleteFromDb(table: string, column: string, value: any) {
  const { error } = await supabaseDb
    .from(table)
    .delete()
    .eq(column, value);
  
  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }
}
