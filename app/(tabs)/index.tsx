import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import { queries } from '~/utils/queries';

export default function Home() {
  const horsesRequest = useQuery(queries.horses.list);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className="my-6 px-2">
        <Text className="font-semi-bold text-lg">Today's activity</Text>
        <Text>who / what / when</Text>
      </View>
      <View className="my-6 flex-1 px-2">
        <Text className="font-semi-bold text-lg">Horses list</Text>
        <FlatList
          data={horsesRequest.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border-b border-gray-200 p-4">
              <View className="flex-row items-center justify-between">
                <Link href={`/horses/${item.id}`} asChild>
                  <Pressable className="w-full flex-row items-center justify-between">
                    <View>
                      <Text className="text-lg font-semibold">{item.name}</Text>
                      <Text className="text-gray-600">{item.owner.username}</Text>
                    </View>
                    <FontAwesome size={16} name="chevron-right" />
                  </Pressable>
                </Link>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
}
