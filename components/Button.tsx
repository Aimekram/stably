import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title: string;
  disabled?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, disabled, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        disabled={disabled}
        className={`${styles.button} ${disabled ? styles.buttonDisabled : ''}  ${touchableProps.className}`}>
        <Text className={`${styles.buttonText} ${disabled ? styles.buttonTextDisabled : ''}`}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: 'items-center bg-indigo-500 rounded-md shadow-sm py-4 px-6',
  buttonDisabled: 'bg-gray-300',
  buttonText: 'text-white text-lg font-semibold text-center',
  buttonTextDisabled: 'text-gray-500',
};
