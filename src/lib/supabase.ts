import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

export type NujoomClient = SupabaseClient<Database>

/** Builds the typed client, or returns null when the env vars are not set (e.g. CI without secrets). */
export function createSupabaseClient(
  url: string | undefined,
  anonKey: string | undefined,
): NujoomClient | null {
  if (!url || !anonKey) return null
  return createClient<Database>(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  })
}

/** The app-wide client. All Supabase access goes through this module. */
export const supabase = createSupabaseClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const isSupabaseConfigured = supabase !== null
