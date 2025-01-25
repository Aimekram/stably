import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

import { AlertText } from '~/components/AlertText';
import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthProvider';
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
      <>
        <Stack.Screen options={{ title: 'Profile' }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  if (profileRequest.isError || !session) {
    return <AlertText>{ERROR_MESSAGE}</AlertText>;
  }

  const { username, role } = profileRequest.data || {};

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View className="flex-1 items-center gap-4">
        <Text className="my-8">Hello, {session.user.email}!</Text>
        <Text className="my-8">username: {username}</Text>
        <Text className="my-8">role: {role}</Text>
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </>
  );
}
