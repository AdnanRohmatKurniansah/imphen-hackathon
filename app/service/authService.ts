import { createClientSupabase } from "@/app/utils/supabase/client"
import { getOrCreateUmkmProfile } from "./umkmProfileService"

export type registerData = {
    email: string
    password: string
}

export type loginData = {
    email: string
    password: string
}

export const registerWithEmail = async (credentails: registerData) => {
    const { data, error } = await createClientSupabase().auth.signUp({
        email: credentails.email,
        password: credentails.password
    })

    return { data, error }
}

export const loginWithEmail = async (credentials: loginData) => {
  const { data, error } = await createClientSupabase().auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) return { data, error }

  const user = data.user
  if (!user) return { data, error: null }

  await getOrCreateUmkmProfile(user.id)

  return { data, error }
}


export const loginWithGoogle = async () => {
  const { data, error } = await createClientSupabase().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) return { data, error }

  return { data, error }
}

export const logout = async () => {
  const { error } = await createClientSupabase().auth.signOut()

  return { error }
}

export const getCurrentUser = async () => {
  const { data: { 
    user 
  }, error } = await createClientSupabase().auth.getUser()

  return { user, error }
}

