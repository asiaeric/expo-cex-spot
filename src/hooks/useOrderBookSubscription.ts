import { useEffect } from "react";

import { wsClient } from "@/CexSpot";
import { useStoreActions } from "@/stores/hooks";
import { OrderBookData } from "@/types";
import { WebSocketMessage } from "@/types/socket";
import TopicHelper from "@/ws/topic";

export const useOrderBookSubscription = ({
  symbol,
  depth,
}: {
  symbol: string | undefined;
  depth: number;
}) => {
  const { updateOrderBooks } = useStoreActions((store) => store.orderBookModel);

  useEffect(() => {
    if (!symbol) {
      return undefined;
    }

    const topic = TopicHelper.orderBookTopic(symbol, depth || 100);
    const callback = (msg: WebSocketMessage) => {
      updateOrderBooks(msg.data as OrderBookData);
    };

    wsClient.subscribe(topic, callback);

    return () => {
      wsClient.unsubscribe(topic);
    };
  }, [symbol]);
};
