import { useEffect } from "react";

import { wsClient } from "@/CexSpot";
import { useStoreActions } from "@/stores/hooks";
import { WebSocketMessage } from "@/types/socket";
import TopicHelper from "@/ws/topic";

export const useOrderSubscription = () => {
  const { updateOpenOrders } = useStoreActions(
    (store) => store.openOrdersModal,
  );
  const { updateOrderHistory } = useStoreActions(
    (store) => store.orderHistoryModel,
  );
  useEffect(() => {
    const topic = TopicHelper.orderTopic();
    const callback = (msg: WebSocketMessage) => {
      console.log("ORDER_SUBSCRIPTION", msg);

      updateOpenOrders(msg);
      updateOrderHistory(msg);
    };

    wsClient.subscribe(topic, callback);

    return () => {
      wsClient.unsubscribe(topic);
    };
  }, []);
};
