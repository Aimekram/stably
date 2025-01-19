import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';

import { AlertText } from '~/components/AlertText';
import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

const ERROR_MESSAGE = 'An error occurred while fetching profile data';

export default function Home() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // setUsername(data.username);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Profile' }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View className="flex-1 items-center">
        {session?.user ? (
          <Text className="my-8">Hello {session.user.email}</Text>
        ) : (
          <AlertText>{ERROR_MESSAGE}</AlertText>
        )}
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </>
  );
}
