import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { useHeaderMeasurements } from "react-native-collapsible-tab-view";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { useTheme } from "@/theme";

function ListEmptyComponent() {
  const { t } = useTranslation("common");
  const { layout, fonts, components } = useTheme();

  const { top, height } = useHeaderMeasurements();
  const translateY = useDerivedValue(() => {
    return interpolate(-top.value, [0, height || 0], [-(height || 0) / 2, 0]);
  }, [height]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter, stylez]}>
      <LottieView
        speed={2}
        autoPlay
        loop
        source={require("@/theme/assets/images/no_order.json")}
        style={components.lottieIcon}
      />
      <Text style={[fonts.size_16, fonts.gray50]}>{t("noOrder")}</Text>
    </Animated.View>
  );
}
export default ListEmptyComponent;
