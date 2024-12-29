import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { UserStatus } from "@/types/users";

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";
const REGISTER_ROUTE = "/register";
const ACCOUNT_PENDING_ROUTE = "/account-pending";

export async function authMiddleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    return user
      ? {
          ...user,
          ...profileData,
        }
      : null;
  };

  const user = await getUser();

  const handleRedirect = (pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.redirect(url);
  };

  const isPublicRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/account-pending");

  if (isPublicRoute) {
    return supabaseResponse;
  }

  if (!user) {
    return handleRedirect("/login");
  }

  if (user.status === UserStatus.PENDING) {
    if (request.nextUrl.pathname !== "/account-pending") {
      return handleRedirect("/account-pending");
    }
    return supabaseResponse;
  }

  return supabaseResponse;
}
