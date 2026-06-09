import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wrvhowhrciuuteajupng.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zDrElxTWSUID5F4ofr9o_g_NjTpLU2C';

const existeJanela = typeof window !== 'undefined';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: existeJanela ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: existeJanela,
    detectSessionInUrl: false,
  },
});
