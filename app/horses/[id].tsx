import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View, Text, ActivityIndicator, TextInput } from 'react-native';

import { useAuth } from '~/contexts/AuthProvider';
import { queries } from '~/utils/queries';

type HorseFormValues = {
  menu_breakfast: string;
  menu_lunch: string;
  menu_dinner: string;
};

export default function HorseDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();

  const horseRequest = useQuery(queries.horses.oneById(id));
  const isReadOnly = horseRequest.data?.owner.id !== user?.id;

  const { register } = useForm<HorseFormValues>({
    defaultValues: {
      menu_breakfast: horseRequest.data?.menu_breakfast ?? '',
      menu_lunch: horseRequest.data?.menu_lunch ?? '',
      menu_dinner: horseRequest.data?.menu_dinner ?? '',
    },
  });

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
            {...register('menu_breakfast')}
            editable={!isReadOnly}
            multiline
            numberOfLines={4}
            placeholder={isReadOnly ? 'No info provided' : "Add info about horse's breakfast..."}
            textAlignVertical="top"
            className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
          />
        </View>
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            Lunch
          </Text>
          <TextInput
            {...register('menu_lunch')}
            editable={!isReadOnly}
            multiline
            numberOfLines={4}
            placeholder={isReadOnly ? 'No info provided' : "Add info about horse's lunch..."}
            textAlignVertical="top"
            className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
          />
        </View>
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            Dinner
          </Text>
          <TextInput
            {...register('menu_dinner')}
            editable={!isReadOnly}
            multiline
            numberOfLines={4}
            placeholder={isReadOnly ? 'No info provided' : "Add info about horse's dinner..."}
            textAlignVertical="top"
            className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
          />
        </View>
      </View>
    </View>
  );
}
