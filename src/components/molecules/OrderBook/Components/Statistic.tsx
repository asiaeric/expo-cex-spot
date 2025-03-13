import { memo } from "react";
import { Text, ViewStyle } from "react-native";

import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { getDecimalPlaces } from "@/utils/OrderHelpers";
import { formatNumberDisplay } from "@/utils/StringHelper";

interface Props {
  style?: ViewStyle | ViewStyle[];
}

const Statistic = memo(({ style }: Props) => {
  const { fonts, layout } = useTheme();
  const { currentPair } = useStoreState((store) => store.tradingPairModel);
  const statistic = useStoreState((state) =>
    state.statisticModel.statistics.get(currentPair?.code || ""),
  );

  const colorMapping = {
    up: fonts.green,
    down: fonts.red500,
    equal: fonts.gray400,
  };
  const lastPriceColor = colorMapping[statistic?.trend || "equal"];

  const decimalPlaces = getDecimalPlaces(currentPair?.quoteAsset.decimals || 0);

  return (
    <Text
      style={[
        fonts.size_20,
        fonts.bold,
        lastPriceColor,
        layout.selfCenter,
        style,
      ]}>
      {formatNumberDisplay(statistic?.c, decimalPlaces)}
    </Text>
  );
});

export default Statistic;
