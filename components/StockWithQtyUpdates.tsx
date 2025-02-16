import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { NumericInput } from './core/NumericInput';

import { STOCK_TEXTS } from '~/utils/dictionary';
import { queries, Stock } from '~/utils/queries';
import { queryClient } from '~/utils/queryClient';
import { useDebounce } from '~/utils/useDebounce';

type StockWithQtyUpdatesProps = {
  horseId: string;
};

export const StockWithQtyUpdates = ({ horseId }: StockWithQtyUpdatesProps) => {
  const stockRequest = useQuery(queries.stock.listByHorseId(horseId));

  const fodder = stockRequest.data?.filter((item) => item.type === 'fodder') ?? [];
  const supplements = stockRequest.data?.filter((item) => item.type === 'supplement') ?? [];

  if (stockRequest.isPending) {
    return (
      <View className="my-2 py-4">
        <ActivityIndicator />
      </View>
    );
  }

  if (stockRequest.error) {
    return (
      <View className="my-2 p-4">
        <Text>Error loading stock data</Text>
      </View>
    );
  }

  if (stockRequest.data.length === 0) {
    return (
      <View className="my-2 p-4">
        <Text>No data about stock</Text>
      </View>
    );
  }

  return (
    <View className="my-2 bg-white p-4">
      <StockSection title={STOCK_TEXTS.types_list_titles.fodder} items={fodder} />
      <StockSection title={STOCK_TEXTS.types_list_titles.supplement} items={supplements} />
    </View>
  );
};

type FormValues = {
  [key: string]: number;
};

const StockSection = ({ title, items }: { title: string; items: Stock[] }) => {
  const { control, reset } = useForm<FormValues>({
    defaultValues: Object.fromEntries(items.map((item) => [item.id, item.quantity])),
  });

  const updateStockRequest = useMutation({
    ...queries.stock.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
      Toast.show({
        type: 'success',
        text1: STOCK_TEXTS.update_success,
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: STOCK_TEXTS.update_error,
      });
      reset();
    },
  });

  const debouncedUpdate = useDebounce((id: string, quantity: number) => {
    updateStockRequest.mutate({ id, quantity });
  }, 500);

  if (items.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      <Text className="mb-1 text-lg font-semibold text-gray-600">{title}</Text>
      {items.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center justify-between border-b border-gray-200 py-2">
          <Text className="text-gray-800">{item.food_name}</Text>
          <Controller
            control={control}
            name={item.id}
            rules={{
              min: { value: 0, message: STOCK_TEXTS.errors.quantity_negative },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <NumericInput
                value={value}
                onChange={(quantity) => {
                  onChange(quantity);
                  debouncedUpdate(item.id, quantity);
                }}
                error={error}
              />
            )}
          />
        </View>
      ))}
    </View>
  );
};
