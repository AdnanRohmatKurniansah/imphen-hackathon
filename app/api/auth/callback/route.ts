import { NextResponse } from "next/server"
import { createServerSupabase } from "@/app/utils/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard/setup-profile"

  if (!code) {
    return NextResponse.redirect(`${origin}/sign-in?error=invalid_code`)
  }

  const supabase = await createServerSupabase()

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return NextResponse.redirect(`${origin}/sign-in?error=${error.message}`)
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: existingProfile } = await supabase
      .from("umkm_profile")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (!existingProfile) {
      await supabase.from("umkm_profile").insert({
        user_id: user.id,
        business_name: "",
        category_id: null,
        description: "",
        location: "",
        logo_url: null,
      })
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
