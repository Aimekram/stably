import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, ActivityIndicator, TextInput } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { queries } from '~/utils/queries';

export default function HorseDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const [breakfast, setBreakfast] = useState('');
  const [dinner, setDinner] = useState('');

  const horseRequest = useQuery(queries.horses.oneById(id));
  const isReadOnly = horseRequest.data?.owner.id !== user?.id;

  if (horseRequest.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (horseRequest.isError) {
    return <Text>Couldn't load horse details</Text>;
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: horseRequest.data?.name }} />
      <Text className="my-4 px-2">{horseRequest.data?.owner.username}</Text>
      <View className="flex-column my-4 gap-4 bg-white p-2 pt-4">
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            Breakfast
          </Text>
          <TextInput
            readOnly={isReadOnly}
            multiline
            numberOfLines={4}
            value={breakfast}
            onChangeText={setBreakfast}
            placeholder="Add info about horse's breakfast..."
            textAlignVertical="top"
            className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
          />
        </View>
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            Dinner
          </Text>
          <TextInput
            readOnly={isReadOnly}
            multiline
            numberOfLines={4}
            value={dinner}
            onChangeText={setDinner}
            placeholder="Add info about horse's dinner..."
            textAlignVertical="top"
            className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
          />
        </View>
      </View>
    </View>
  );
}
