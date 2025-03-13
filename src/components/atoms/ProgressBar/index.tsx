import { useEffect } from "react";
import { View, StyleSheet, DimensionValue, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/theme";

interface ProgressBarProps {
  progress: number; // Expected to be between 0 and 100
  duration?: number; // Animation duration in milliseconds
  height?: number;
  width?: DimensionValue | undefined;
  background?: ViewStyle;
}

function ProgressBar({
  progress,
  duration = 500,
  height = 4,
  width = "100%",
  background,
}: ProgressBarProps) {
  const { backgrounds, borders } = useTheme();
  const animatedProgress = useSharedValue(0);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration });
  }, [progress, duration]);

  return (
    <View style={[[styles.container, backgrounds.gray400, { height, width }]]}>
      <Animated.View
        style={[
          styles.progressBar,
          borders.rounded_16,
          progressStyle,
          background,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
  },
});

export default ProgressBar;
