import { useCallback, useEffect } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import * as Tabs from "react-native-collapsible-tab-view";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

import TradingItem from "./TradingItem";
import ListEmptyComponent from "../../ListEmptyComponent";
import { OrderTabsName } from "../index";

import FilterHistory from "@/components/molecules/FilterHistory";
import { initialFilter } from "@/constants";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { FilterDate, Trading } from "@/types";

const renderItem = ({ item }: { item: Trading }) => {
  return <TradingItem item={item} />;
};

const AnimatedFlatList = Animated.createAnimatedComponent(
  Tabs.FlatList<Trading>,
);

const TradingHistory = () => {
  const {
    trading,
    tradeLoading: isLoading,
    tradeRefreshing: refreshing,
    filters,
  } = useStoreState((state) => state.tradingModel);

  const {
    getTrading,
    loadmoreTrading,
    silentRefreshTrading,
    refreshTrading,
    setFilters,
  } = useStoreActions((action) => action.tradingModel);

  const { gutters } = useTheme();
  const focusedTab = Tabs.useFocusedTab();

  useEffect(() => {
    if (focusedTab === OrderTabsName.Trading) {
      silentRefreshTrading();
    }
  }, [focusedTab]);

  useEffect(() => {
    return () => {
      setFilters(initialFilter);
    };
  }, []);

  const handleLoadMore = () => {
    if (!isLoading) {
      loadmoreTrading();
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <ActivityIndicator
        animating
        size="large"
        style={gutters.marginBottom_80}
      />
    );
  };

  const onFilterChange = useCallback((payload: FilterDate) => {
    setFilters(payload);
    getTrading();
  }, []);

  const header = () => {
    return <FilterHistory onFilterChange={onFilterChange} filters={filters} />;
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

  const startRefreshing = () => {
    refreshTrading();
  };

  return (
    <Tabs.Lazy cancelLazyFadeIn>
      <AnimatedFlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={header}
        contentContainerStyle={gutters.marginBottom_40}
        showsVerticalScrollIndicator={false}
        data={trading}
        keyExtractor={(i) => `trading-${i.action}-${i.id}`}
        renderItem={renderItem}
        CellRendererComponent={renderCell}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        nestedScrollEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={startRefreshing}
            tintColor="white"
          />
        }
      />
    </Tabs.Lazy>
  );
};

export default TradingHistory;
