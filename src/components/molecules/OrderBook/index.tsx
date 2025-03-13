import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View, ViewStyle } from "react-native";

import AggregationSelection from "../AggregationSelection";
import AskItem from "./Components/AskItem";
import BidItem from "./Components/BidItem";
import OrderBookLoading from "./Components/OrderBookLoading";

import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { OrderAction, OrderPair, OrderSide } from "@/types";
import { checkInOpenOrders, fillOrderBooks } from "@/utils/OrderBookHelpers";

interface IOrderBook {
  customStyle?: ViewStyle | ViewStyle[];
}

interface RAsks {
  item: OrderPair;
}

interface RBids {
  // eslint-disable-next-line react/no-unused-prop-types
  item: OrderPair;
  // eslint-disable-next-line react/no-unused-prop-types
  isReverse?: boolean;
}

const DEFAULT_DISPLAY = 40;

const OrderBook = ({ customStyle }: IOrderBook) => {
  const { t } = useTranslation("order");
  const { fonts, gutters, layout } = useTheme();

  const { orderBookLoading, asks, bids, maxAsk, maxBid } = useStoreState(
    (store) => store.orderBookModel,
  );

  const { currentAggregation, currentPair } = useStoreState(
    (store) => store.tradingPairModel,
  );

  const { openOrders } = useStoreState((store) => store.openOrdersModel);

  const renderAsks = useCallback(
    ({ item }: RAsks) => {
      const compareOrders = openOrders.filter(
        (order) =>
          order.symbolCode === currentPair?.code &&
          order.action === OrderAction.SELL,
      );

      const checkIsUserOrder = checkInOpenOrders(
        OrderSide.ASKS,
        compareOrders,
        item[0],
        0.01,
      );
      return (
        <AskItem
          markPosition="right"
          price={item[0]}
          size={item[1]}
          maxAsk={maxAsk}
          isMarkDisplay={checkIsUserOrder}
        />
      );
    },
    [maxAsk, asks, openOrders, currentAggregation],
  );

  const renderBids = useCallback(
    ({ item, isReverse = false }: RBids) => {
      const compareOrders = openOrders.filter(
        (order) =>
          order.symbolCode === currentPair?.code &&
          order.action === OrderAction.BUY,
      );

      const checkIsUserOrder = checkInOpenOrders(
        OrderSide.BIDS,
        compareOrders,
        item[0],
        0.01,
      );
      return (
        <BidItem
          price={item[0]}
          size={item[1]}
          maxBid={maxBid}
          isReverse={isReverse}
          isMarkDisplay={checkIsUserOrder}
        />
      );
    },
    [maxBid, bids, openOrders, currentAggregation],
  );

  return (
    <View style={[gutters.margin_16, customStyle]}>
      <View>
        <View
          style={[
            layout.row,
            layout.justifyBetween,
            gutters.marginBottom_8,
            gutters.marginHorizontal_10,
          ]}>
          <Text style={[fonts.size_14, fonts.bold, fonts.gray400]}>
            {t("bids")}
          </Text>
          <View style={[layout.row, layout.itemsCenter]}>
            <Text style={[fonts.size_14, fonts.bold, fonts.gray400]}>
              {t("asks")}
            </Text>
            <AggregationSelection
              type="tiny"
              customStyle={gutters.marginLeft_12}
            />
          </View>
        </View>

        <View style={[layout.row, layout.justifyBetween]} />

        {orderBookLoading ? (
          <OrderBookLoading />
        ) : (
          <View style={[layout.row]}>
            <FlatList
              scrollEnabled={false}
              data={fillOrderBooks(bids, DEFAULT_DISPLAY)}
              keyExtractor={(item, index) =>
                `order-book-bid-${item[0] ? `${item[0]}value` : index}`
              }
              renderItem={renderBids}
              style={[layout.flex_1]}
            />
            <FlatList
              scrollEnabled={false}
              data={fillOrderBooks(asks, DEFAULT_DISPLAY)}
              keyExtractor={(item, index) =>
                `order-book-ask-${item[0] ? `${item[0]}value` : index}`
              }
              renderItem={renderAsks}
              style={[layout.flex_1, gutters.marginLeft_12]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(OrderBook);
