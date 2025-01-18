import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/Button';
import { ScreenContent } from '~/components/ScreenContent';
import { supabase } from '~/utils/supabase';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View className="flex-1">
        <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
      </View>
      <View className="flex-1 items-center">
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </>
  );
}
