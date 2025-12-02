import { createClientSupabase } from "../utils/supabase/client";

export const getCategories = async () => {
  const { data, error } = await createClientSupabase()
    .from("umkm_categories")
    .select("*")
    .order("name", { ascending: true })

  return { data, error };
}