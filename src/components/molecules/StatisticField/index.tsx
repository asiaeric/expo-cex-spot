import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { getDecimalPlaces } from "@/utils/OrderHelpers";
import { formatNumberDisplay } from "@/utils/StringHelper";

function StatisticField() {
  const { t } = useTranslation("common");
  const { layout, fonts, gutters } = useTheme();

  const { currentPair } = useStoreState((store) => store.tradingPairModel);
  const statistic = useStoreState((store) =>
    store.statisticModel.statistics.get(currentPair?.code || ""),
  );

  const priceChangeColor =
    statistic?.percentPriceChange && statistic?.percentPriceChange > 0
      ? fonts.green
      : fonts.red500;

  const colorMapping = {
    up: fonts.green,
    down: fonts.red500,
    equal: fonts.gray200,
  };
  const lastPriceColor =
    colorMapping[(statistic?.trend as "up" | "down" | "equal") || "equal"];

  const decimalPlaces = getDecimalPlaces(currentPair?.minQuoteStep || 0);

  return (
    <View
      style={[
        gutters.marginHorizontal_16,
        gutters.paddingVertical_16,
        layout.row,
        layout.justifyBetween,
      ]}>
      <View style={layout.justifyAround}>
        <Text style={[fonts.size_28, fonts.gray50, fonts.bold, lastPriceColor]}>
          {formatNumberDisplay(statistic?.c, decimalPlaces)}
        </Text>
        <Text
          style={[
            fonts.size_16,
            fonts.gray200,
            gutters.marginBottom_12,
            priceChangeColor,
          ]}>
          {`${statistic?.percentPriceChange?.toFixed(2) || 0} %`}
        </Text>
      </View>
      <View style={layout.row}>
        <View>
          <Text style={[fonts.size_12, fonts.gray400]}>{t("24hHigh")}</Text>
          <Text style={[fonts.size_14, fonts.gray50, gutters.marginTop_4]}>
            {`${formatNumberDisplay(statistic?.h, decimalPlaces, true)}`}
          </Text>
          <Text style={[fonts.size_12, fonts.gray400, gutters.marginTop_10]}>
            {t("24hLow")}
          </Text>
          <Text style={[fonts.size_14, fonts.gray50, gutters.marginTop_4]}>
            {`${formatNumberDisplay(statistic?.l, decimalPlaces, true)}`}
          </Text>
        </View>
        <View style={gutters.marginLeft_16}>
          <Text style={[fonts.size_12, fonts.gray400]}>
            {t("24hVol", { symbol: currentPair?.baseAsset.code })}
          </Text>
          <Text style={[fonts.size_14, fonts.gray50, gutters.marginTop_4]}>
            {`${formatNumberDisplay(statistic?.v)}`}
          </Text>
          <Text style={[fonts.size_12, fonts.gray400, gutters.marginTop_10]}>
            {t("24hVol", { symbol: currentPair?.quoteAsset.code })}
          </Text>
          <Text style={[fonts.size_14, fonts.gray50, gutters.marginTop_4]}>
            {`${formatNumberDisplay(statistic?.v)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default StatisticField;
