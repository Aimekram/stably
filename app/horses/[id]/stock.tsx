import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

import { NewStockForm } from '~/components/NewStockForm';
import { StockWithQtyUpdates } from '~/components/StockWithQtyUpdates';
import { BTN_TEXTS } from '~/utils/dictionary';
import { queries } from '~/utils/queries';

export default function StockDetails() {
  const { id: horseId } = useLocalSearchParams<{ id: string }>();

  const horseRequest = useQuery(queries.horses.oneById(horseId));

  return (
    <ScrollView className="flex-1 py-4">
      <Stack.Screen
        options={{ title: horseRequest.data?.name ?? '', headerBackTitle: BTN_TEXTS.back }}
      />
      <StockWithQtyUpdates horseId={horseId} />
      <NewStockForm horseId={horseId} />
    </ScrollView>
  );
}
