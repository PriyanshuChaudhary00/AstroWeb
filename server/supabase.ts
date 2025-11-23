import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

export const supabaseDb = createClient(supabaseUrl, supabaseAnonKey);

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
