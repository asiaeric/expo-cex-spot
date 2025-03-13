import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, FlatList, ViewStyle } from "react-native";

import MarketTradeRow from "./MarketTradeRow";

import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { moderateScale } from "@/types/theme/responsive";

interface Props {
  customStyle?: ViewStyle | ViewStyle[];
}

export const TRADING_MARKET_ITEMS = 40;

function MarketTrade({ customStyle }: Props) {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation("order");

  const { marketTrades } = useStoreState((store) => store.marketTradeModel);
  const { currentPair } = useStoreState((store) => store.tradingPairModel);
  const { getMarketTrades } = useStoreActions(
    (store) => store.marketTradeModel,
  );

  // useMarketTradeSubscription(currentSymbol?.code || '')

  useEffect(() => {
    getMarketTrades(currentPair!.code);
  }, [currentPair?.code]);

  return (
    <View style={[customStyle, gutters.margin_16]}>
      <View style={[layout.row, layout.justifyBetween, layout.fullWidth]}>
        <View style={[layout.row, gutters.paddingBottom_8]}>
          <Text
            style={[
              fonts.size_12,
              fonts.bold,
              fonts.gray400,
              { width: moderateScale(88) },
            ]}>
            {t("time")}
          </Text>
          <Text
            style={[
              fonts.size_12,
              fonts.bold,
              fonts.gray400,
              gutters.marginLeft_40,
            ]}>
            {t("price")}
          </Text>
        </View>
        <Text style={[fonts.size_12, fonts.bold, fonts.gray400]}>
          {t("quantity")}
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={marketTrades}
        keyExtractor={(item) => `market-trade-${item.updatedAt}-${item.action}`}
        renderItem={({ item }) => <MarketTradeRow item={item} />}
      />
    </View>
  );
}

export default memo(MarketTrade);
