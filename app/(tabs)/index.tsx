import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { queries } from '~/utils/queries';

export default function Home() {
  const horsesRequest = useQuery(queries.horses.list);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className="my-4 px-2">
        <Text className="font-semi-bold text-lg">Today's activity</Text>
        <Text>who / what / when</Text>
      </View>
      <View className="my-4 px-2">
        <Text className="font-semi-bold text-lg">Horses</Text>
        <Text>NAME: {horsesRequest.data?.[0]?.name}</Text>
        <Text>OWNER: {horsesRequest.data?.[0]?.owner.username}</Text>
      </View>
    </>
  );
}
