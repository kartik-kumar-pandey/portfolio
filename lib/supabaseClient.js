import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xatznneiwrihecrnqivf.supabase.co'
const supabaseKey = typeof window === 'undefined'
  ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY)
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey);