  import { createServerClient } from "@supabase/ssr";
  import { NextResponse, type NextRequest } from "next/server";

  export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });

            cookiesToSet.forEach(({ name, value }) =>
              supabaseResponse.cookies.set(name, value)
            );
          },
        },
      }
    );

    const { data: session } = await supabase.auth.getUser();
    const user = session.user;

    if (!user && (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/setup-profile"))) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    if (
      user &&
      (request.nextUrl.pathname.startsWith("/sign-in") ||
        request.nextUrl.pathname.startsWith("/sign-up"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname.startsWith("/dashboard")) {
      const { data: profile } = await supabase
        .from("umkm_profile")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!profile && !request.nextUrl.pathname.startsWith("/dashboard/setup-profile")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard/setup-profile";
        return NextResponse.redirect(url);
      }
    }

    return supabaseResponse;
  }

  export function middleware(request: NextRequest) {
    return updateSession(request);
  }

  export const config = {
    matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
  };
