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

interface IBidItem {
  price: number;
  size: number;
  maxBid: number;
  onPress?: (item: number) => void;
  isReverse?: boolean;
  isMarkDisplay?: boolean;
}

const BidItem = memo(
  ({ price, size, maxBid, isReverse, onPress, isMarkDisplay }: IBidItem) => {
    const { fonts, layout, gutters, colors, components } = useTheme();

    const sizePercent = (size / maxBid) * 100;

    const animatedWidth = useSharedValue(0);

    animatedWidth.value = withTiming(sizePercent, { duration: 200 });

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
        backgroundColor: colors.greenTransparent,
        position: "absolute",
        [isReverse ? "left" : "right"]: 0,
        top: 0,
      };
    });

    return (
      <TouchableOpacity activeOpacity={0.8} disabled={!onPress}>
        <Animated.View style={animatedBackgroundStyle} />
        <View style={[layout.row, layout.itemsCenter]}>
          {isMarkDisplay && <View style={components.yellowDot} />}
          <View style={layout.flex_1}>
            {!isReverse ? (
              <View style={[layout.row, layout.justifyBetween]}>
                <AppText.SubTitle style={fonts.gray800}>
                  {formatNumberDisplay(size, decimalLotSize)}
                </AppText.SubTitle>
                <AppText.SubTitle style={fonts.green}>
                  {price
                    ? `${formatNumberDisplay(price, decimalTickSize)}`
                    : "--"}
                </AppText.SubTitle>
              </View>
            ) : (
              <View style={[layout.row, layout.justifyBetween]}>
                <AppText.SubTitle style={fonts.green}>
                  {price
                    ? `${formatNumberDisplay(price, decimalTickSize)}`
                    : "--"}
                </AppText.SubTitle>
                <AppText.SubTitle style={fonts.gray800}>
                  {formatNumberDisplay(size, decimalLotSize)}
                </AppText.SubTitle>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default BidItem;
