import React, { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";

import { AppText } from "@/components/atoms";
import { useStatisticSubscription } from "@/hooks/useStatisticSubscription";
import { useAppNavigation } from "@/navigators/Application";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { TradingPair } from "@/types";
import { RouteName } from "@/types/navigation";
import { getDecimalPlaces } from "@/utils/OrderHelpers";
import { formatNumberDisplay, roundNumber } from "@/utils/StringHelper";

type Props = {
  pair: TradingPair;
};

const PairCard = ({ pair }: Props) => {
  const { layout, gutters, colors, borders, fonts } = useTheme();
  const { setCurrentPair } = useStoreActions((state) => state.tradingPairModel);
  const navigation = useAppNavigation();

  useStatisticSubscription({ code: pair.code });

  const statistic = useStoreState((state) =>
    state.statisticModel.statistics.get(pair.code),
  );

  const colorMapping = {
    up: colors.success200,
    down: colors.red500,
    equal: colors.gray200,
  } as const;

  const decimalPlaces = getDecimalPlaces(pair?.minQuoteStep || 0);

  const lastPriceColor =
    colorMapping[(statistic?.trend as "up" | "down" | "equal") || "equal"];

  const onPressPair = useCallback(() => {
    setCurrentPair(pair);
    navigation.navigate(RouteName.Trading);
  }, []);

  return (
    <TouchableOpacity
      style={[layout.row, layout.itemsCenter, layout.justifyBetween]}
      onPress={onPressPair}>
      <View
        style={[
          layout.flex_1,
          layout.row,
          layout.itemsCenter,
          layout.justifyBetween,
          gutters.marginRight_40,
        ]}>
        <View>
          <AppText.H5>{pair.name}</AppText.H5>
          <AppText.SubTitle style={fonts.neutral300}>
            {formatNumberDisplay(statistic?.q || 0, 2, true)}
          </AppText.SubTitle>
        </View>
        <View style={[layout.itemsEnd]}>
          <AppText.H5>
            {formatNumberDisplay(statistic?.c, decimalPlaces)}
          </AppText.H5>
          <AppText.SubTitle style={fonts.neutral300}>
            ${formatNumberDisplay(statistic?.c, decimalPlaces)}
          </AppText.SubTitle>
        </View>
      </View>
      <View style={[layout.row, layout.itemsCenter, layout.justifyBetween]}>
        <View
          style={[
            gutters.paddingVertical_6,
            borders.rounded_4,
            layout.itemsCenter,
            { backgroundColor: lastPriceColor, width: 80 },
          ]}>
          <AppText.H5>
            {roundNumber(statistic?.percentPriceChange, 2) || 0}%
          </AppText.H5>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PairCard);
