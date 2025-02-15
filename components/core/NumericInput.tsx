import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TextInput, Pressable } from 'react-native';

type NumericInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: { message?: string };
  label: string;
  step?: number;
};

export const NumericInput = ({ value, onChange, error, label, step = 1 }: NumericInputProps) => {
  const increment = () => onChange(value + step);
  const decrement = () => onChange(Math.max(0, value - step));

  return (
    <View>
      <Text className="text-md mb-2 font-semibold text-gray-600">{label}</Text>
      <View
        className={`${error ? 'border-red-500' : 'border-green-200'} flex-row items-center self-start rounded-md border`}>
        <Pressable onPress={decrement} className="rounded-l-md  bg-green-50 p-4">
          <FontAwesome name="minus" size={16} color="black" />
        </Pressable>

        <TextInput
          value={value.toString()}
          onChangeText={(text) => onChange(parseFloat(text) || 0)}
          keyboardType="decimal-pad"
          className={`w-16 px-2 py-3 text-center `}
        />

        <Pressable onPress={increment} className="rounded-r-md  bg-green-50 p-4">
          <FontAwesome name="plus" size={16} color="black" />
        </Pressable>
      </View>
      {error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>}
    </View>
  );
};
