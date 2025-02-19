import { FontAwesome } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type SwipeToDeleteItemProps = PropsWithChildren<{
  onDelete: () => void;
}>;

export const SwipeToDeleteItem = ({ onDelete, children }: SwipeToDeleteItemProps) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      'worklet';
      translateX.value = Math.min(0, translateX.value + event.changeX);
    })
    .onEnd(() => {
      'worklet';
      if (translateX.value < -100) {
        runOnJS(onDelete)();
      }
      translateX.value = withSpring(0);
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="relative">
      <View className="absolute right-0 h-full w-20 items-center justify-center bg-red-500">
        <FontAwesome name="trash" size={24} color="white" />
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={rStyle} className="bg-white">
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
