import "server-only";

import { createClient } from "@supabase/supabase-js";

function expectEnv(value: string | undefined, label: string) {
  if (!value) {
    throw new Error(`${label} is required for Supabase-backed content.`);
  }

  return value;
}

// The admin client uses the service role key so server actions can update content documents securely.
export function getSupabaseAdminClient() {
  const supabaseUrl = expectEnv(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL",
  );
  const serviceRoleKey = expectEnv(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    "SUPABASE_SERVICE_ROLE_KEY",
  );

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
