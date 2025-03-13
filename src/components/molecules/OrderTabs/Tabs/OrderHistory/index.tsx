import { useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as Tabs from "react-native-collapsible-tab-view";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

import HistoryItem from "./HistoryItem";
import ListEmptyComponent from "../../ListEmptyComponent";

import FilterHistory from "@/components/molecules/FilterHistory";
import { initialFilter } from "@/constants";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { FilterDate, Order } from "@/types";

const renderItem = ({ item }: { item: Order }) => {
  return <HistoryItem item={item} />;
};

const AnimatedFlatList = Animated.createAnimatedComponent(Tabs.FlatList<Order>);

const OrderHistory = () => {
  const {
    orderHistory,
    orderHistoryLoading: isLoading,
    orderHistoryPage,
    filters,
  } = useStoreState((state) => state.orderHistoryModel);
  const { getOrderHistory, loadmoreOrderHistory, setFilters } = useStoreActions(
    (action) => action.orderHistoryModel,
  );

  const { gutters } = useTheme();

  useEffect(() => {
    if (orderHistoryPage === 1) getOrderHistory();
    return () => {
      setFilters(initialFilter);
    };
  }, []);

  const handleLoadMore = () => {
    if (!isLoading) {
      loadmoreOrderHistory();
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator animating size="large" />;
  };

  const renderCell = useCallback(
    (props: any) => (
      <Animated.View
        {...props}
        layout={LinearTransition.springify()}
        entering={FadeIn}
      />
    ),
    [],
  );

  const onFilterChange = useCallback((payload: FilterDate) => {
    setFilters(payload);
    getOrderHistory();
  }, []);

  const header = () => {
    return <FilterHistory onFilterChange={onFilterChange} filters={filters} />;
  };
  return (
    <Tabs.Lazy cancelLazyFadeIn>
      <AnimatedFlatList
        stickyHeaderIndices={[0]}
        contentContainerStyle={gutters.marginBottom_40}
        showsVerticalScrollIndicator={false}
        data={orderHistory}
        keyExtractor={(i) => `orderHistory-${i.id}`}
        renderItem={renderItem}
        CellRendererComponent={renderCell}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={header}
        nestedScrollEnabled
      />
    </Tabs.Lazy>
  );
};

export default OrderHistory;
