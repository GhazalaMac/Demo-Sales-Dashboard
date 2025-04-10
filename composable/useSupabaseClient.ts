
let supabase: ReturnType<typeof import('@supabase/supabase-js').createClient> | null = null

export const useSupabaseClient = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be used in the browser.')
  }

  if (!supabase) {
    const { createClient } = await import('@supabase/supabase-js')

    const supabaseUrl = 'https://zunhtytidfigjjkzzzsy.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1bmh0eXRpZGZpZ2pqa3p6enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTI2MjcsImV4cCI6MjA1OTc4ODYyN30.qPl8JhtEJCROvJtfqmfyuzt8iox3TEyzojF24fNCWKM'

    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('[Supabase] Client created')
  }

  return supabase
}
