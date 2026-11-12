import { createClient } from '@supabase/supabase-js'

// Typed client wiring (generated Database types) arrives with NUJ-14.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient(url, anonKey) : null
