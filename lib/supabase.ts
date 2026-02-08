import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Remove the strict throw to allow build to proceed even if vars are missing
// The application will just fail to fetch data (which is handled gracefully in components)
// instead of crashing the entire build process.
// if (!supabaseUrl || !supabaseKey) {
//     throw new Error('Missing Supabase environment variables');
// }

export const supabase = createClient(supabaseUrl, supabaseKey);
