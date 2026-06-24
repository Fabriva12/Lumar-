import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  supabaseUrl !== 'your_supabase_url_here' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here'

let supabaseClient

if (isConfigured) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
} else {
  const msg = 'Supabase no está configurado. Creá un archivo .env en la raíz del proyecto con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.'

  function notConfigured() { throw new Error(msg) }

  supabaseClient = new Proxy({}, {
    get(_, prop) {
      if (prop === 'auth') {
        return {
          getSession: notConfigured,
          getUser: notConfigured,
          signInWithPassword: notConfigured,
          signOut: notConfigured,
          onAuthStateChange: notConfigured,
        }
      }
      if (prop === 'from') {
        return () => new Proxy({}, {
          get: () => notConfigured,
        })
      }
      return notConfigured
    },
  })
}

export const supabase = supabaseClient
