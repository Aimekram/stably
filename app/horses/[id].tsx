import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, ActivityIndicator, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthProvider';
import { BTN_TEXTS, HORSE_MENU_TEXTS } from '~/utils/dictionary';
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

type HorseFormValues = {
  menu_breakfast: string;
  menu_lunch: string;
  menu_dinner: string;
};

type HorseMenuFormProps = {
  horseMenu: HorseFormValues;
  isReadOnly: boolean;
  horseId: string;
};

const HorseMenuForm = ({ horseMenu, isReadOnly, horseId }: HorseMenuFormProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<HorseFormValues>({
    defaultValues: {
      menu_breakfast: horseMenu.menu_breakfast ?? '',
      menu_lunch: horseMenu.menu_lunch ?? '',
      menu_dinner: horseMenu.menu_dinner ?? '',
    },
  });

  const updateHorse = useMutation({
    ...queries.horses.update(horseId),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.horses.oneById(horseId));
      Toast.show({ type: 'success', text1: HORSE_MENU_TEXTS.successful_update });
    },
    onError: (error) => {
      Toast.show({ type: 'error', text1: HORSE_MENU_TEXTS.error_update, autoHide: false });
      console.error('Update error:', error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateHorse.mutate(data);
  });

  return (
    <View className="flex-column my-4 gap-4 bg-white p-2 pt-4">
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
              editable={!isReadOnly}
              multiline
              numberOfLines={4}
              placeholder={isReadOnly ? '-' : HORSE_MENU_TEXTS.placeholder}
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
              editable={!isReadOnly}
              multiline
              numberOfLines={4}
              placeholder={isReadOnly ? '-' : HORSE_MENU_TEXTS.placeholder}
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
              editable={!isReadOnly}
              multiline
              numberOfLines={4}
              placeholder={isReadOnly ? '-' : HORSE_MENU_TEXTS.placeholder}
              textAlignVertical="top"
              className="min-h-[80px] rounded-md border border-green-200 bg-white px-3 py-3"
            />
          )}
        />
      </View>
      {isReadOnly ? null : (
        <View className="p-4">
          <Button
            title={BTN_TEXTS.save}
            onPress={onSubmit}
            disabled={!isDirty || updateHorse.isPending}
          />
        </View>
      )}
    </View>
  );
};
