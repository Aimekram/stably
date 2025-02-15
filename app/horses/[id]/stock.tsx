import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { NewStockForm } from '~/components/NewStockForm';
import { BTN_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

export default function StockDetails() {
  const { id: horseId } = useLocalSearchParams<{ id: string }>();

  const horseRequest = useQuery(queries.horses.oneById(horseId));

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{ title: horseRequest.data?.name ?? '', headerBackTitle: BTN_TEXTS.back }}
      />
      <NewStockForm horseId={horseId} />
    </View>
  );
}
