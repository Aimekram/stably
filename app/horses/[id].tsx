import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

import { HorseMenuForm } from '~/components/HorseMenuForm';
import { useAuth } from '~/contexts/AuthProvider';
import { HORSE_MENU_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

export default function HorseDetails() {
  const { id: horseId } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const horseRequest = useQuery(queries.horses.oneById(horseId));
  const isReadOnly = horseRequest.data?.owner.id !== user?.id;

  if (horseRequest.isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: '...' }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  if (horseRequest.isError || !horseRequest.data) {
    return (
      <>
        <Stack.Screen options={{ title: '...' }} />
        <Text>{HORSE_MENU_TEXTS.error}</Text>;
      </>
    );
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: horseRequest.data.name ?? '' }} />
      {isReadOnly ? (
        <Text className="my-4 px-2">owner: {horseRequest.data.owner.username}</Text>
      ) : null}
      <HorseMenuForm horseMenu={horseRequest.data} isReadOnly={isReadOnly} horseId={horseId} />
    </View>
  );
}
