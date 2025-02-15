import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native';

import { STOCK_TEXTS } from '~/utils/dictionary';
import { queries, Stock } from '~/utils/queries';

type StockReadOnlyProps = {
  horseId: string;
};

export const StockReadOnly = ({ horseId }: StockReadOnlyProps) => {
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
    return <Text>Error loading stock data</Text>;
  }

  if (stockRequest.data.length === 0) {
    return (
      <View className="p-4">
        <Text>No data about stock</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <StockSection title={STOCK_TEXTS.types_list_titles.fodder} items={fodder} />
      <StockSection title={STOCK_TEXTS.types_list_titles.supplement} items={supplements} />
    </View>
  );
};

const StockSection = ({ title, items }: { title: string; items: Stock[] }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-semibold text-gray-600">{title}</Text>
      {items.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center justify-between border-b border-gray-200 py-2">
          <Text className="text-gray-800">{item.food_name}</Text>
          <Text className="px-8 font-medium">{item.quantity}</Text>
        </View>
      ))}
    </View>
  );
};
