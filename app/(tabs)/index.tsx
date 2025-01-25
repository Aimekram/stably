import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className="my-4 px-2">
        <Text className="font-semi-bold text-lg">Today's activity</Text>
        <Text>who / what / when</Text>
      </View>
      <View className="my-4 px-2">
        <Text className="font-semi-bold text-lg">Horses</Text>
      </View>
    </>
  );
}
