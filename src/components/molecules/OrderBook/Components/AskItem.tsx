import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppText } from "@/components/atoms";
import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { getDecimalPlaces } from "@/utils/OrderHelpers";
import { formatNumberDisplay } from "@/utils/StringHelper";

interface IAskItem {
  price: number;
  size: number;
  maxAsk: number;
  onPress?: (item: number) => void;
  isMarkDisplay?: boolean;
  markPosition?: "left" | "right";
}

const AskItem = memo(
  ({
    price,
    size,
    maxAsk,
    onPress,
    isMarkDisplay,
    markPosition = "left",
  }: IAskItem) => {
    const { fonts, layout, colors, components, gutters } = useTheme();

    const sizePercent = (size / maxAsk) * 100;

    const animatedWidth = useSharedValue(0);

    animatedWidth.value = withTiming(sizePercent, { duration: 500 });

    const { currentPair } = useStoreState((store) => store.tradingPairModel);

    const decimalTickSize = getDecimalPlaces(
      currentPair?.quoteAsset.decimals || 0,
    );
    const decimalLotSize = getDecimalPlaces(
      currentPair?.baseAsset.decimals || 0,
    );

    const animatedBackgroundStyle = useAnimatedStyle(() => {
      return {
        width: `${animatedWidth.value}%`,
        height: "100%",
        backgroundColor: colors.redTransparent,
        position: "absolute",
        left: 0,
        top: 0,
      };
    });

    function renderMarkRight() {
      if (markPosition !== "right") {
        return null;
      }

      if (isMarkDisplay) {
        return (
          <View
            style={[
              components.yellowDot,
              gutters.marginLeft_4,
              { marginRight: 0 },
            ]}
          />
        );
      }
      return <View style={gutters.marginLeft_10} />;
    }

    return (
      <TouchableOpacity disabled={!onPress} activeOpacity={0.8}>
        <Animated.View style={animatedBackgroundStyle} />
        <View style={[layout.row, layout.itemsCenter]}>
          {markPosition === "left" && isMarkDisplay && (
            <View style={components.yellowDot} />
          )}
          <View style={[layout.flex_1]}>
            <View style={[layout.row, layout.justifyBetween]}>
              <AppText.SubTitle style={[fonts.size_12, fonts.red500]}>
                {price
                  ? `${formatNumberDisplay(price, decimalTickSize)}`
                  : "--"}
              </AppText.SubTitle>
              <AppText.SubTitle style={[fonts.size_12, fonts.gray800]}>
                {formatNumberDisplay(size, decimalLotSize)}
              </AppText.SubTitle>
            </View>
          </View>
          {renderMarkRight()}
        </View>
      </TouchableOpacity>
    );
  },
);

export default AskItem;
