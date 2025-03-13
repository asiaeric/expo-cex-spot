import { memo } from "react";
import { Text, View } from "react-native";

import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { OrderAction, TradingMarket } from "@/types";
import { moderateScale } from "@/types/theme/responsive";
import { getDecimalPlaces } from "@/utils/OrderHelpers";
import { displayTime, formatNumberDisplay } from "@/utils/StringHelper";

interface Props {
  item: TradingMarket;
}

const MarketTradeRow = ({ item }: Props) => {
  const { layout, gutters, fonts } = useTheme();

  const fontColor =
    item.action === OrderAction.BUY ? fonts.green : fonts.red500;

  const { currentSymbol } = useStoreState((store) => store.orderBookModel);
  const decimalTickSize = getDecimalPlaces(currentSymbol?.tickSize || 0);
  const decimalLotSize = getDecimalPlaces(currentSymbol?.lotSize || 0);

  return (
    <View
      style={[
        layout.row,
        layout.fullWidth,
        layout.justifyBetween,
        gutters.paddingVertical_2,
      ]}>
      <View style={[layout.row]}>
        <Text style={[fonts.gray50, { width: moderateScale(88) }]}>
          {displayTime(item.createdAt)}
        </Text>
        <Text style={[fonts.gray50, gutters.marginLeft_40, fontColor]}>
          {item.matchingPrice
            ? `${formatNumberDisplay(item?.matchingPrice, decimalTickSize)}`
            : "--"}
        </Text>
      </View>
      <Text style={fonts.gray50}>
        {formatNumberDisplay(item.quantity, decimalLotSize)}
      </Text>
    </View>
  );
};
export default memo(MarketTradeRow);
