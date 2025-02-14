import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type AlertTextProps = PropsWithChildren<{
  type?: 'error' | 'warning';
}>;

export const AlertText = ({ children, type = 'error' }: AlertTextProps) => (
  <View className="w-full px-2 py-4">
    <Text className={`rounded-md px-4 py-2 ${getAlertTextColor(type)}`}>{children}</Text>
  </View>
);

const getAlertTextColor = (type: AlertTextProps['type']) => {
  switch (type) {
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'error':
    default:
      return 'text-red-600 bg-red-100';
  }
};
