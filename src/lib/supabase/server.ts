import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

export function createClient(request: Request) {
  const headers = new Headers();

  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "") as {
            name: string;
            value: string;
          }[];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );

  return { supabase, headers };
}
