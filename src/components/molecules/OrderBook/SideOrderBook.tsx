import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  LayoutChangeEvent,
  Text,
  View,
  ViewStyle,
} from "react-native";

import AggregationSelection from "../AggregationSelection";
import OrderBookFilter, { OrderBookFilterType } from "../OrderBookFilter";
import AskItem from "./Components/AskItem";
import BidItem from "./Components/BidItem";
import OrderBookLoading from "./Components/OrderBookLoading";
import Statistic from "./Components/Statistic";

import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { OrderAction, OrderPair, OrderSide } from "@/types";
import { checkInOpenOrders, fillOrderBooks } from "@/utils/OrderBookHelpers";

interface IOrderBook {
  customStyle?: ViewStyle | ViewStyle[];
  onPressItems?: (e: number) => void;
}

const SMALL_DISPLAY = 8;
const FULL_DISPLAY = 18;

interface RAsks {
  item: OrderPair;
}

interface RBids {
  // eslint-disable-next-line react/no-unused-prop-types
  item: OrderPair;
  // eslint-disable-next-line react/no-unused-prop-types
  isReverse?: boolean;
}

function SideOrderBook({ customStyle, onPressItems }: IOrderBook) {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation(["order"]);

  const [listHeight, setListHeight] = useState(0);
  const [filter, setFilter] = useState<OrderBookFilterType>(
    OrderBookFilterType.ALL,
  );

  // orderModel
  const {
    orderBookLoading,
    asks,
    bids,
    maxAsk,
    maxBid,
    currentAggregation,
    currentSymbol,
  } = useStoreState((store) => store.orderBookModel);

  const { openOrders } = useStoreState((store) => store.openOrdersModal);

  const optimizeLayout = (event: LayoutChangeEvent) => {
    setListHeight(event.nativeEvent.layout.height);
  };

  const renderAsks = useCallback(
    ({ item }: RAsks) => {
      const compareOrders = openOrders.filter(
        (order) =>
          order.symbolCode === currentSymbol?.code &&
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
          price={item[0]}
          size={item[1]}
          maxAsk={maxAsk}
          onPress={onPressItems}
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
          order.symbolCode === currentSymbol?.code &&
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
          onPress={onPressItems}
          isMarkDisplay={checkIsUserOrder}
        />
      );
    },
    [maxBid, bids, openOrders, currentAggregation],
  );

  const renderList = () => {
    switch (filter) {
      case OrderBookFilterType.ASK:
        return (
          <View>
            {orderBookLoading ? (
              <View style={{ height: listHeight }}>
                <OrderBookLoading />
              </View>
            ) : (
              <FlatList
                ListFooterComponent={<Statistic style={gutters.marginTop_12} />}
                onLayout={optimizeLayout}
                initialNumToRender={FULL_DISPLAY}
                scrollEnabled={false}
                data={fillOrderBooks(asks, FULL_DISPLAY).reverse()}
                keyExtractor={(item, index) =>
                  `side-ask-${item[0] ? `${item[0]}side-value` : index}`
                }
                renderItem={renderAsks}
              />
            )}
          </View>
        );
      case OrderBookFilterType.BID:
        return (
          <View>
            {orderBookLoading ? (
              <View style={{ height: listHeight }}>
                <OrderBookLoading />
              </View>
            ) : (
              <FlatList
                ListHeaderComponent={
                  <Statistic style={gutters.marginVertical_12} />
                }
                onLayout={optimizeLayout}
                initialNumToRender={FULL_DISPLAY}
                scrollEnabled={false}
                data={fillOrderBooks(bids, FULL_DISPLAY)}
                keyExtractor={(item, index) =>
                  `side-bid-${item[0] ? `${item[0]}side-value` : index}`
                }
                renderItem={({ item }) => renderBids({ item, isReverse: true })}
              />
            )}
          </View>
        );
      default:
        return (
          <View>
            <View style={layout.flex_1}>
              {orderBookLoading ? (
                <View style={{ height: listHeight }}>
                  <OrderBookLoading />
                </View>
              ) : (
                <FlatList
                  onLayout={optimizeLayout}
                  initialNumToRender={SMALL_DISPLAY}
                  scrollEnabled={false}
                  data={fillOrderBooks(asks, SMALL_DISPLAY).reverse()}
                  keyExtractor={(item, index) =>
                    `side-ask-${item[0] ? `${item[0]}side-value` : index}`
                  }
                  renderItem={renderAsks}
                />
              )}
            </View>
            <Statistic style={gutters.marginVertical_12} />
            <View style={[layout.flex_1]}>
              {orderBookLoading ? (
                <View style={{ height: listHeight }}>
                  <OrderBookLoading />
                </View>
              ) : (
                <FlatList
                  initialNumToRender={SMALL_DISPLAY}
                  scrollEnabled={false}
                  data={fillOrderBooks(bids, SMALL_DISPLAY)}
                  keyExtractor={(item, index) =>
                    `side-bid-${item[0] ? `${item[0]}side-value` : index}`
                  }
                  renderItem={({ item }) =>
                    renderBids({ item, isReverse: true })
                  }
                />
              )}
            </View>
          </View>
        );
    }
  };

  return (
    <View style={[customStyle]}>
      <View style={[layout.row, layout.itemsCenter]}>
        <AggregationSelection
          type="small"
          customStyle={[layout.flex_1, gutters.marginRight_12]}
        />
        <OrderBookFilter type={filter} onChange={setFilter} />
      </View>
      <View style={[layout.row, layout.justifyBetween, gutters.marginTop_24]}>
        <Text
          style={[
            fonts.size_12,
            fonts.bold,
            fonts.gray400,
            gutters.marginBottom_8,
            gutters.marginLeft_10,
          ]}>
          {t("order:price")}
        </Text>
        <Text
          style={[
            fonts.size_12,
            fonts.bold,
            fonts.gray400,
            gutters.marginBottom_8,
          ]}>
          {t("order:quantity")}
        </Text>
      </View>
      {renderList()}
    </View>
  );
}

export default memo(SideOrderBook);
