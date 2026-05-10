// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);


import { createClient } from "@supabase/supabase-js";

export function createClerkSupabaseClient(session) {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    {
      accessToken: async () => {
        return session?.getToken() ?? null;
      },
    }
  );
}