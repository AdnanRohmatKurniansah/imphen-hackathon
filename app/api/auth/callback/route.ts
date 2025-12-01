import { NextResponse } from "next/server";
import { createServerSupabase } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/sign-in?error=${error.message}`);
  }

  return NextResponse.redirect(`${origin}/sign-in?error=invalid_code`);
}
