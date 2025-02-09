import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';

import { AlertText } from '~/components/AlertText';
import { Button } from '~/components/Button';
import { queries } from '~/utils/queries';

export default function Users() {
  const profilesRequest = useQuery({
    ...queries.profiles.list,
    select: (data) => data.filter((item) => item.role !== 'stable_owner'),
  });

  if (profilesRequest.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (profilesRequest.isError) {
    return <AlertText>Couldn't load profiles</AlertText>;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Users' }} />
      <View className="my-4 flex-1 px-2">
        <FlatList
          data={profilesRequest.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border-b border-gray-200 p-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-semibold">{item.username}</Text>
                  <Text className="text-gray-600">{item.role}</Text>
                </View>
                <Link href={`/users/${item.id}`} asChild>
                  <Button title="Edit" onPress={() => {}} />
                </Link>
              </View>
            </View>
          )}
        />
        <NewProfileBtn />
      </View>
    </>
  );
}

const NewProfileBtn = () => (
  <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
    <Link href="/users/new" asChild>
      <Pressable className="rounded-full bg-green-800 px-5 py-4">
        <FontAwesome size={20} name="plus" color="white" />
      </Pressable>
    </Link>
  </View>
);
