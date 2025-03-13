import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import {
  MaterialTabBar,
  MaterialTabItem,
  MaterialTabItemProps,
  Tabs,
} from "react-native-collapsible-tab-view";
import {
  TabBarProps,
  TabItemProps,
  TabName,
} from "react-native-collapsible-tab-view/lib/typescript/src/types";

import TabItem from "./TabItem";
import {
  AssetTab,
  OpenOrders,
  OrderHistory,
  OrderTabsName,
  TradingHistory,
} from "./Tabs";

import OrderHistorySvg from "@/components/svg/OrderHistorySvg";
import { navigate } from "@/navigators/NavigationUtils";
import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { RouteName } from "@/types/navigation";
import { moderateScale } from "@/types/theme/responsive";

const MIN_HEADER_HEIGHT = 0;
export const TAB_BAR_HEIGHT = moderateScale(48);
interface OrderTabsProps {
  renderHeader?: (props: TabBarProps<TabName>) => React.ReactElement | null;
  displayHistory?: boolean;
  displayAssets?: boolean;
  displaySpotAction?: boolean;
  displayOpenOrder?: boolean;
}

function makeLabel<T extends TabName>(label: string) {
  return function labelRenderer({ index, indexDecimal }: TabItemProps<T>) {
    return <TabItem index={index} indexDecimal={indexDecimal} label={label} />;
  };
}

function OrderTabs({
  renderHeader,
  displayOpenOrder = false,
  displayAssets = false,
  displayHistory = false,
  displaySpotAction = false,
}: OrderTabsProps) {
  const { backgrounds, layout } = useTheme();
  const { t } = useTranslation(["common"]);

  const { openOrderCount } = useStoreState((store) => store.openOrdersModal);

  const renderTabItemComponent = useCallback(
    (props: MaterialTabItemProps<TabName>) => (
      <MaterialTabItem {...props} pressOpacity={1} android_ripple={undefined} />
    ),
    [],
  );

  const onSpotHistoryPress = () => {
    navigate(RouteName.Spot);
  };

  return (
    <Tabs.Container
      containerStyle={(layout.flex_1, layout.zm1, layout.overflowHidden)}
      headerContainerStyle={backgrounds.neutral600}
      snapThreshold={0.5}
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          indicatorStyle={backgrounds.green}
          TabItemComponent={renderTabItemComponent}
          rightComponent={
            displaySpotAction ? (
              <TouchableOpacity onPress={onSpotHistoryPress}>
                <OrderHistorySvg />
              </TouchableOpacity>
            ) : null
          }
        />
      )}
      headerHeight={moderateScale(470)}
      tabBarHeight={moderateScale(TAB_BAR_HEIGHT)}
      minHeaderHeight={MIN_HEADER_HEIGHT}
      renderHeader={renderHeader}>
      {displayOpenOrder ? (
        <Tabs.Tab
          name={OrderTabsName.OpenOrders}
          label={makeLabel(t("common:openOrders", { value: openOrderCount }))}>
          <OpenOrders />
        </Tabs.Tab>
      ) : null}

      {displayHistory ? (
        <Tabs.Tab
          name={OrderTabsName.OrderHistory}
          label={makeLabel(t("common:orderHistory"))}>
          <OrderHistory />
        </Tabs.Tab>
      ) : null}
      {displayHistory ? (
        <Tabs.Tab
          name={OrderTabsName.Trading}
          label={makeLabel(t("common:trading"))}>
          <TradingHistory />
        </Tabs.Tab>
      ) : null}
      {displayAssets ? (
        <Tabs.Tab
          name={OrderTabsName.Assets}
          label={makeLabel(t("common:assets"))}>
          <AssetTab />
        </Tabs.Tab>
      ) : null}
    </Tabs.Container>
  );
}

export default OrderTabs;
