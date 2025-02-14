import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

import { AlertText } from '~/components/core/AlertText';
import { Button } from '~/components/core/Button';
import { useAuth } from '~/contexts/AuthProvider';
import { AUTH_TEXTS, BTN_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';
import { supabase } from '~/utils/supabase';

const ERROR_MESSAGE = 'An error occurred while fetching profile data';

export default function Profile() {
  const { session, userRole } = useAuth();
  const isHorseOwner = userRole === 'horse_owner';

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
      {isHorseOwner ? <NewHorseBtn /> : null}
      <Button
        title={AUTH_TEXTS.logout}
        onPress={() => supabase.auth.signOut()}
        className="mt-auto"
      />
    </View>
  );
}

const NewHorseBtn = () => (
  <View style={{}}>
    <Link href="/horses/new" asChild>
      <Button title={BTN_TEXTS.new_horse} onPress={() => {}} />
    </Link>
  </View>
);
