import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/theme";
import { moderateScale } from "@/types/theme/responsive";

interface AnimatedCheckboxProps {
  checked: boolean;
}

interface PasswordRequirementRowProps {
  label: string;
  isFulfilled: boolean;
}

const AnimatedCheckbox = ({ checked }: AnimatedCheckboxProps) => {
  const { colors, fonts, layout, borders } = useTheme();

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(checked ? colors.green : colors.purple100, {
      duration: 300,
      easing: Easing.ease,
    }),
    borderColor: withTiming(checked ? colors.green : colors.purple100, {
      duration: 300,
    }),
  }));

  const checkmarkStyle = useAnimatedStyle(() => ({
    opacity: withTiming(checked ? 1 : 0, {
      duration: 300,
    }),
    transform: [{ scale: withTiming(checked ? 1 : 0.1, { duration: 300 }) }],
  }));

  return (
    <View style={styles.checkboxContainer}>
      <Animated.View
        style={[
          layout.fullHeight,
          layout.fullWidth,
          borders.rounded_16,
          boxStyle,
          layout.itemsCenter,
          layout.justifyCenter,
          borders.w_2,
        ]}>
        <Animated.View style={[checkmarkStyle]}>
          <Text style={[fonts.gray50, fonts.size_10]}>✔</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const PasswordRequirementRow = ({
  label,
  isFulfilled,
}: PasswordRequirementRowProps) => {
  const { fonts, gutters, colors, layout } = useTheme();
  const animatedStyles = useAnimatedStyle(() => ({
    width: withTiming(isFulfilled ? "100%" : "0%", {
      duration: 400,
      easing: Easing.out(Easing.quad),
    }),
    backgroundColor: colors.green,
    height: 2,
    position: "absolute",
    bottom: "50%",
    transform: [{ translateY: 1 }],
  }));

  return (
    <View style={[layout.row, layout.itemsCenter, gutters.marginBottom_4]}>
      <AnimatedCheckbox checked={isFulfilled} />
      <View
        style={[
          styles.textContainer,
          layout.itemsCenter,
          layout.justifyCenter,
          gutters.marginLeft_8,
        ]}>
        <Text
          style={[
            fonts.size_12,
            fonts.bold,
            isFulfilled ? fonts.green : fonts.gray200,
          ]}>
          {label}
        </Text>
        <Animated.View style={animatedStyles} />
      </View>
    </View>
  );
};

export default PasswordRequirementRow;

const styles = StyleSheet.create({
  textContainer: {
    height: moderateScale(24),
  },
  checkboxContainer: {
    width: moderateScale(24),
    height: moderateScale(24),
    padding: moderateScale(2),
  },
});
