import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { supabase } from '~/utils/supabase';

type AuthContextValue = {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  session: Session | null;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  session: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsSessionLoaded(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, isAuthenticated: !!session?.user, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
