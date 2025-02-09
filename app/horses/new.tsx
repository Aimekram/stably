import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthProvider';
import { BTN_TEXTS, HORSE_MENU_TEXTS, HORSE_NAME_TEXTS, TAB_TITLES } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

type HorseFormValues = {
  name: string;
  menu_breakfast: string;
  menu_lunch: string;
  menu_dinner: string;
};

export default function NewHorse() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();

  const { handleSubmit, control } = useForm<HorseFormValues>();

  const createHorse = useMutation({
    ...queries.horses.create,
    onSuccess: () => {
      queryClient.invalidateQueries(queries.horses.list);
      router.push('/');
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!user?.id || !data.name) {
      return;
    }

    createHorse.mutate({
      ...data,
      owner_id: user.id,
    });
  });

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: TAB_TITLES.horses_new, headerBackTitle: 'Home' }} />
      <View className="flex-column my-4 gap-4 bg-white p-2 pt-4">
        <View className="relative mb-8">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            {HORSE_NAME_TEXTS.label}
          </Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: HORSE_NAME_TEXTS.error_required,
              minLength: { value: 2, message: HORSE_NAME_TEXTS.error_minLength },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={HORSE_NAME_TEXTS.placeholder}
                  textAlignVertical="top"
                  className={`rounded-md border bg-white px-3 py-3 ${error ? 'border-red-500' : 'border-green-200'}`}
                />
                {error && <Text className="mt-1 px-1 text-sm text-red-500">{error.message}</Text>}
              </>
            )}
          />
        </View>
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            {HORSE_MENU_TEXTS.breakfast}
          </Text>
          <Controller
            control={control}
            name="menu_breakfast"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                placeholder={HORSE_MENU_TEXTS.placeholder}
                textAlignVertical="top"
                className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
              />
            )}
          />
        </View>
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            {HORSE_MENU_TEXTS.lunch}
          </Text>
          <Controller
            control={control}
            name="menu_lunch"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                placeholder={HORSE_MENU_TEXTS.placeholder}
                textAlignVertical="top"
                className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
              />
            )}
          />
        </View>
        <View className="relative">
          <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
            {HORSE_MENU_TEXTS.dinner}
          </Text>
          <Controller
            control={control}
            name="menu_dinner"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                placeholder={HORSE_MENU_TEXTS.placeholder}
                textAlignVertical="top"
                className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
              />
            )}
          />
        </View>

        <View className="p-4">
          <Button
            title={BTN_TEXTS.save_short}
            onPress={onSubmit}
            disabled={createHorse.isPending}
          />
        </View>
      </View>
    </View>
  );
}
