'use client';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import { useUser } from '@kit/supabase/hooks/use-user';

export function useAuth() {
  const user = useUser(); // safe: RootProviders already sets QueryClient
  const supabase = useSupabase();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    signOut,
    isAuthenticated: Boolean(user),
  };
}
