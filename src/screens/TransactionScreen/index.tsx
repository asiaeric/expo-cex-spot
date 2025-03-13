import { useCallback, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { PairSelection } from "@/components/molecules";
import SideOrderBook from "@/components/molecules/OrderBook/SideOrderBook";
import OrderTabs from "@/components/molecules/OrderTabs";
import { Header } from "@/components/molecules/OrderTabs/Header";
import TransactionForm from "@/components/molecules/TransactionForm";
import ChartSvg from "@/components/svg/ChartSvg";
import SettingSvg from "@/components/svg/SettingSvg";
import { SafeScreen } from "@/components/template";
import { MAX_OPEN_ORDER, ORDER_STATUS } from "@/constants/orders";
import { useOrderBookSubscription } from "@/hooks/useOrderBookSubscription";
import { useOrderSubscription } from "@/hooks/useOrderSubscription";
import { useStatisticSubscription } from "@/hooks/useStatisticSubscription";
import { navigationRef } from "@/navigators/NavigationUtils";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { RouteName } from "@/types/navigation";

const TransactionScreen = () => {
  const { layout, gutters } = useTheme();
  const { getOrderBooks } = useStoreActions((store) => store.orderBookModel);
  const { fetchAssets } = useStoreActions((action) => action.assetModel);
  const { currentPair } = useStoreState((store) => store.tradingPairModel);

  useEffect(() => {
    fetchAssets();
    const intervalId = setInterval(fetchAssets, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentPair]);

  useOrderBookSubscription({
    symbol: currentPair?.code,
    depth: 100,
  });

  useOrderSubscription();
  useStatisticSubscription({ code: currentPair!.code });

  useEffect(() => {
    getOrderBooks({
      size: MAX_OPEN_ORDER,
      statuses: [ORDER_STATUS.OPEN, ORDER_STATUS.PARTIAL],
      symbolCode: currentPair?.code,
    });
  }, [currentPair?.code]);

  const { getOpenOrders } = useStoreActions((action) => action.openOrdersModal);
  useEffect(() => {
    getOpenOrders();
  }, []);

  const renderHeader = useCallback(
    () => (
      <Header>
        <TransactionForm customStyle={styles.leftHeader} />
        <SideOrderBook
          customStyle={styles.rightHeader}
          // onPressItems={() => {}}
        />
      </Header>
    ),
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeScreen ignoreEdge={["bottom"]}>
        <View
          style={[layout.row, layout.justifyBetween, gutters.marginLeft_16]}>
          <View style={[layout.row, layout.itemsCenter]}>
            <PairSelection />
          </View>
          <View style={[layout.row]}>
            <TouchableOpacity
              style={[gutters.marginRight_16, layout.selfCenter]}
              onPress={() => {
                navigationRef.navigate(RouteName.Trading);
              }}>
              <ChartSvg />
            </TouchableOpacity>
            <TouchableOpacity
              style={[gutters.marginRight_16, layout.selfCenter]}
              onPress={() => {
                navigationRef.navigate(RouteName.Setting);
              }}>
              <SettingSvg />
            </TouchableOpacity>
          </View>
        </View>
        <OrderTabs
          renderHeader={renderHeader}
          displayAssets
          displaySpotAction
          displayOpenOrder
        />
      </SafeScreen>
    </TouchableWithoutFeedback>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  leftHeader: {
    flex: 0.6,
  },
  rightHeader: {
    flex: 0.4,
  },
});
