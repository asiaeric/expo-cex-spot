import { getDecimalPlaces } from "./OrderHelpers";

import { Order, OrderBookData, OrderPair, OrderSide } from "@/types";

export const roundToNearest = (
  value: number,
  ticketSize: number,
  type: OrderSide,
): number => {
  const decimals = getDecimalPlaces(ticketSize);
  const factor = 10 ** decimals;

  const rounded =
    type === OrderSide.ASKS
      ? Math.ceil((value * factor) / (ticketSize * factor)) * ticketSize
      : Math.floor((value * factor) / (ticketSize * factor)) * ticketSize;
  return rounded;
};

export const groupByTicketSize = (
  orderBookData: OrderBookData,
  ticketSize: number,
  depth: number,
): { asks: OrderPair[]; bids: OrderPair[] } => {
  const groupOrders = (orders: OrderPair[], type: OrderSide): OrderPair[] => {
    const results: { [key: number]: number } = {};

    orders?.forEach((order) => {
      const roundedPrice = roundToNearest(order[0], ticketSize, type);
      results[roundedPrice] = (results[roundedPrice] || 0) + Number(order[1]);
    });

    const items: OrderPair[] = Object.entries(results).map(
      ([price, quantity]): OrderPair => [parseFloat(price), quantity],
    );

    items?.sort(([price1], [price2]) =>
      type === OrderSide.BIDS ? price2 - price1 : price1 - price2,
    );

    return items;
  };

  return {
    asks: groupOrders(orderBookData.asks, OrderSide.ASKS),
    bids: groupOrders(orderBookData.bids, OrderSide.BIDS),
  };
};
export function fillOrderBooks(array: OrderPair[], length = 20) {
  const newArray = [...array];

  if (newArray.length > length) {
    return newArray.slice(0, length);
  }

  const deficit = length - newArray.length;

  if (deficit > 0) {
    const lastElement: OrderPair = [0, 0];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < deficit; i++) {
      newArray.push(lastElement);
    }
  }

  return newArray;
}

export const numberSizeInput = (input: number, tickSize: number): number => {
  "worklet";

  let cleanedInput = input;

  // Check if the input has a decimal part
  if (cleanedInput % 1 !== 0) {
    const commaIndex = cleanedInput.toString().indexOf(".");

    if (commaIndex !== -1) {
      const beforeComma = cleanedInput.toString().slice(0, commaIndex + 1);
      let afterComma = cleanedInput
        .toString()
        .slice(commaIndex + 1)
        .replace(/[^0-9]/g, "");

      // Determine the number of decimal places allowed
      const decimalPlaces = tickSize.toString().split(".")[1]?.length || 0;

      // Trim the input to the allowed number of decimal places
      if (afterComma.length > decimalPlaces) {
        afterComma = afterComma.slice(0, decimalPlaces);
      }

      cleanedInput = parseFloat(beforeComma + afterComma);
    }
  }

  return cleanedInput;
};

export function checkInOpenOrders(
  type: OrderSide,
  openOrders: Order[],
  price: number,
  currentAggregation: number,
) {
  const decimals = getDecimalPlaces(currentAggregation);
  const factor = 10 ** decimals;

  const priceInOpenOrders = new Set(
    openOrders.map((order) => {
      return type === OrderSide.ASKS
        ? Math.ceil(
            (order.priceFromUser * factor) / (currentAggregation * factor),
          ) * currentAggregation
        : Math.floor(
            (order.priceFromUser * factor) / (currentAggregation * factor),
          ) * currentAggregation;
    }),
  );
  return priceInOpenOrders.has(price);
}
