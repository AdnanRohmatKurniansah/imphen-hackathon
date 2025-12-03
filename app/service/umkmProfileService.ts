import { createClientSupabase } from "@/app/utils/supabase/client"

export const getUmkmProfile = async (userId: string) => {
  const { data, error } = await createClientSupabase()
    .from("umkm_profile")
    .select("*")
    .eq("user_id", userId)
    .single()

  return { data, error }
}

export const createUmkmProfile = async (userId: string) => {
  const { data, error } = await createClientSupabase()
    .from("umkm_profile")
    .insert({
      user_id: userId,
      business_name: "",
      category_id: null,
      description: "",
      location: "",
      logo_url: null
    })
    .select()
    .single()

  return { data, error }
}

export const getOrCreateUmkmProfile = async (userId: string) => {
  const { data: profile } = await getUmkmProfile(userId)

  if (profile) {
    return profile
  }

  const { data: newProfile } = await createUmkmProfile(userId)

  return newProfile
}