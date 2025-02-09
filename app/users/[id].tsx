import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

import { BTN_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

export default function UserDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const profileRequest = useQuery(queries.profiles.oneById(id));
  const isStableWorker = profileRequest.data?.role === 'stable_worker';
  const isHorseOwner = profileRequest.data?.role === 'horse_owner';

  if (profileRequest.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Stack.Screen options={{ title: 'User Details' }} />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (profileRequest.isError) {
    return (
      <>
        <Stack.Screen options={{ title: 'User Details' }} />
        <Text>Couldn't load user details</Text>;
      </>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'User Details', headerBackTitle: BTN_TEXTS.back }} />
      <Text>User ID: {id}</Text>
      {isStableWorker && <StableWorker />}
      {isHorseOwner && <HorseOwner />}
    </View>
  );
}

const StableWorker = () => {
  return (
    <View>
      <Text>Stable Worker edit</Text>
      <Text>Username - edit?</Text>
      <Text>activity list?</Text>
      <Text>Remove account</Text>
    </View>
  );
};

const HorseOwner = () => {
  return (
    <View>
      <Text>Horse Owner edit</Text>
      <Text>Username - edit?</Text>
      <Text>horses list?</Text>
      <Text>Remove account</Text>
    </View>
  );
};
