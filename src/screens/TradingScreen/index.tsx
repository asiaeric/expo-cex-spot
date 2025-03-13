import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackButton } from "@/components/atoms";
import {
  BottomTradingAction,
  PairSelection,
  TradingTabs,
} from "@/components/molecules";
import StatisticField from "@/components/molecules/StatisticField";
import { TradingView } from "@/components/template";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";

const TradingScreen = () => {
  const { bottom, top } = useSafeAreaInsets();
  const { layout, gutters } = useTheme();
  const { currentPair } = useStoreState((store) => store.tradingPairModel);
  const { getOrderBooks } = useStoreActions((store) => store.orderBookModel);

  useEffect(() => {
    getOrderBooks({
      symbol: currentPair?.code,
    });
  }, [currentPair?.code]);

  return (
    <View style={[layout.flex_1, { marginTop: top, marginBottom: bottom }]}>
      <View
        style={[layout.row, layout.itemsCenter, gutters.marginHorizontal_12]}>
        <BackButton />
        <PairSelection style={gutters.marginLeft_12} />
      </View>
      <StatisticField />
      <ScrollView contentContainerStyle={layout.flexGrow}>
        <TradingView />
        <TradingTabs />
      </ScrollView>
      <BottomTradingAction />
    </View>
  );
};

export default TradingScreen;
