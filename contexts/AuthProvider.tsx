import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Profile } from '~/utils/queries';
import { supabase } from '~/utils/supabase';

type AuthContextValue = {
  user: Session['user'] | null;
  isAuthenticated: boolean;
  userRole: Profile['role'] | null;
  session: Session | null;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  userRole: null,
  session: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false); // TODO: handle error state as well
  const [userRole, setUserRole] = useState<AuthContextValue['userRole']>(null);

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
      setUserRole(data?.role ?? null);
    } finally {
      setIsSessionLoaded(true);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });
  }, []);

  if (!isSessionLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, isAuthenticated: !!session?.user, session, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
