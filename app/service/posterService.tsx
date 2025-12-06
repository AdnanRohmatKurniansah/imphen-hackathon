import { createClientSupabase } from "../utils/supabase/client";

export async function getPosters(profile_id: string, page: number, limit: number) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await createClientSupabase()
    .from("poster_generations")
    .select("*", { count: "exact" })
    .eq("profile_id", profile_id)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0
  }
}

export const addPosterGeneration = async (data: {
  profile_id: string;
  product_id: string;
  headline: string;
  subheadline: string;
  cta: string;
  theme: string;
  image_url: string;
}) => {
  const { data: existing, error: checkError } = await createClientSupabase()
    .from("poster_generations")
    .select("id, created_at")
    .eq("product_id", data.product_id)
    .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString()) 
    .limit(1)
    .maybeSingle();

  if (checkError) {
    console.error("Error cek poster_generations:", checkError);
  }

  if (existing) {
    console.log("Poster untuk product ini sudah digenerate kurang dari 1 jam lalu, tidak ditambahkan.");
    return null;
  }

  const { data: inserted, error } = await createClientSupabase()
    .from("poster_generations")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Error insert poster_generations:", error);
    return null;
  }

  return inserted;
};


export async function deletePoster(id: string) {
  const { error } = await createClientSupabase()
    .from("poster_generations")
    .delete()
    .eq("id", id)

  if (error) throw error
}