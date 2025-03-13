import { View, ViewProps } from "react-native";
import { useHeaderMeasurements } from "react-native-collapsible-tab-view";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useTheme } from "@/theme";

export function Header({ children }: ViewProps) {
  const { top, height } = useHeaderMeasurements();
  const { layout, gutters } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(top.value, [0, -(height || 0)], [0, -1]),
        },
      ],
    };
  });

  return (
    <View style={[gutters.padding_16]} pointerEvents="box-none">
      <Animated.View style={[layout.row, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}
