import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native';

import { AlertText } from '~/components/AlertText';
import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthProvider';
import { AUTH_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';
import { supabase } from '~/utils/supabase';

const ERROR_MESSAGE = 'An error occurred while fetching profile data';

export default function Profile() {
  const { session } = useAuth();

  const profileRequest = useQuery({
    ...queries.profiles.oneById(String(session?.user.id)),
    enabled: !!session?.user.id,
  });

  if (profileRequest.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (profileRequest.isError || !session) {
    return <AlertText>{ERROR_MESSAGE}</AlertText>;
  }

  const { username, role } = profileRequest.data || {};

  return (
    <View className="my-4 flex-1 items-center gap-3">
      <Text>Twój email: {session.user.email}!</Text>
      <Text>Nazwa użytkownika: {username}</Text>
      <Text className="my-8">Rola: {role}</Text>
      <Button title={AUTH_TEXTS.logout} onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
