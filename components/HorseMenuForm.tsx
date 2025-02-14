import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextInput, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { BTN_TEXTS, HORSE_MENU_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

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

export const HorseMenuForm = ({ horseMenu, isReadOnly, horseId }: HorseMenuFormProps) => {
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

  const updateHorseRequest = useMutation({
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
    updateHorseRequest.mutate(data);
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
            disabled={!isDirty || updateHorseRequest.isPending}
          />
        </View>
      )}
    </View>
  );
};
