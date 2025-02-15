import { FontAwesome } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Button } from './core/Button';
import { NumericInput } from './core/NumericInput';

import { BTN_TEXTS, STOCK_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

type StockFormValues = {
  food_name: string;
  quantity: number;
  type: 'fodder' | 'supplement';
};

type StockFormProps = {
  horseId: string;
};

export const NewStockForm = ({ horseId }: StockFormProps) => {
  //   const queryClient = useQueryClient();

  const { control, handleSubmit, reset, watch } = useForm<StockFormValues>({
    defaultValues: {
      food_name: '',
      quantity: 1,
      type: 'fodder',
    },
  });

  const foodTypeWatch = watch('type');

  const createStockRequest = useMutation({
    ...queries.stock.create,
    onSuccess: () => {
      //   queryClient.invalidateQueries(['stock', horseId]);
      Toast.show({
        type: 'success',
        text1: STOCK_TEXTS.add_delivery_success,
      });
      reset();
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    createStockRequest.mutate({
      ...data,
      horse_id: horseId,
    });
  });

  return (
    <View className="flex-column my-4 gap-6 bg-white p-4">
      <Text className="mb-2 text-lg font-bold">{STOCK_TEXTS.form_title}</Text>
      <View className="relative">
        <Text className="text-md absolute left-3 top-[-10px] z-10 bg-white px-2 font-semibold text-gray-600">
          {STOCK_TEXTS.food_name}
        </Text>
        <Controller
          control={control}
          name="food_name"
          rules={{
            required: STOCK_TEXTS.errors.name_required,
            minLength: {
              value: 2,
              message: STOCK_TEXTS.errors.name_length,
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={STOCK_TEXTS.food_name_placeholder}
                className={`${error ? 'border-red-500' : 'border-green-200'} rounded-md border bg-white px-3 py-3`}
              />
              {error && <Text className="mt-1 px-1 text-sm text-red-500">{error.message}</Text>}
            </>
          )}
        />
      </View>
      <Controller
        control={control}
        name="type"
        rules={{ required: STOCK_TEXTS.errors.type_required }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text className="text-md mb-2 font-semibold text-gray-600">{STOCK_TEXTS.type}</Text>
            <View className="flex-row gap-4">
              {Object.entries(STOCK_TEXTS.types).map(([type, label]) => (
                <Pressable
                  key={type}
                  onPress={() => onChange(type)}
                  className={`flex-row items-center gap-2 rounded-md border px-4 py-2 ${
                    value === type ? 'border-green-200 bg-green-50' : 'border-gray-300'
                  }`}>
                  <FontAwesome
                    size={20}
                    name={value === type ? 'dot-circle-o' : 'circle-o'}
                    color={value === type ? 'green' : 'gray'}
                  />
                  <Text>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />
      <Controller
        control={control}
        name="quantity"
        rules={{
          required: STOCK_TEXTS.errors.quantity_required,
          min: {
            value: 0.01,
            message: STOCK_TEXTS.errors.quantity_positive,
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <NumericInput
            value={value}
            onChange={onChange}
            error={error}
            label={
              foodTypeWatch === 'supplement'
                ? STOCK_TEXTS.quantity_supplement
                : STOCK_TEXTS.quantity_fodder
            }
          />
        )}
      />

      <Button
        title={BTN_TEXTS.save_short}
        onPress={onSubmit}
        disabled={createStockRequest.isPending}
      />
    </View>
  );
};
