import { useCallback, useRef } from "react";
import * as Tabs from "react-native-collapsible-tab-view";
import Animated, {
  FadeIn,
  LinearTransition,
  ZoomOut,
} from "react-native-reanimated";

import OrderItem from "./OrderItem";
import ListEmptyComponent from "../../ListEmptyComponent";

import ConfirmPopup, { ConfirmPopupRefProps } from "@/components/ConfirmPopup";
import ModifyPopUp, {
  ModifyPopUpRefProps,
} from "@/components/modal/Popup/ModifyPopUp";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { Order } from "@/types";

const AnimatedFlatList = Animated.createAnimatedComponent(Tabs.FlatList<Order>);

const OpenOrders = () => {
  const { gutters } = useTheme();
  const confirmRef = useRef<ConfirmPopupRefProps>(null);
  const modifyRef = useRef<ModifyPopUpRefProps>(null);

  const { openOrders } = useStoreState((state) => state.openOrdersModal);
  const { cancelTransaction } = useStoreActions(
    (action) => action.openOrdersModal,
  );

  const onConfirm = useCallback((id: number) => {
    cancelTransaction(id);
  }, []);

  const handleCancelTransaction = useCallback((id: number) => {
    confirmRef.current?.open(() => onConfirm(id));
  }, []);

  // const handleModifyTransaction = useCallback((item: Order) => {
  // 	modifyRef.current?.currentOrder(item)
  // 	modifyRef.current?.open()
  // }, [])

  const renderItem = ({ item }: { item: Order }) => {
    return (
      <OrderItem
        item={item}
        onCancel={handleCancelTransaction}
        // onEdit={handleModifyTransaction}
      />
    );
  };

  const renderCell = useCallback(
    (props: any) => (
      <Animated.View
        {...props}
        layout={LinearTransition.springify()}
        entering={FadeIn}
        exiting={ZoomOut}
      />
    ),
    [],
  );

  return (
    <Tabs.Lazy cancelLazyFadeIn mountDelayMs={300}>
      <>
        <AnimatedFlatList
          contentContainerStyle={[gutters.paddingVertical_40]}
          showsVerticalScrollIndicator={false}
          data={openOrders}
          keyExtractor={(i) => `openOrders-${i.id}`}
          renderItem={renderItem}
          CellRendererComponent={renderCell}
          ListEmptyComponent={ListEmptyComponent}
          nestedScrollEnabled
        />
        <ConfirmPopup ref={confirmRef} />
        <ModifyPopUp ref={modifyRef} />
      </>
    </Tabs.Lazy>
  );
};

export default OpenOrders;
