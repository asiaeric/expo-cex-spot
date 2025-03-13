import { deleteData, fetchData, postData } from "./api";

import {
  ApiResponse,
  CreateOrderQuery,
  FetchOrderStatus,
  Order,
  OrderBookData,
  TradingMarket,
} from "@/types";

export const cancelOrderById = async (id: number): Promise<any> => {
  try {
    return await deleteData(`orders/${id}`);
  } catch (error) {
    console.error(`Error canceling order ${id}:`, error);
    throw new Error("Failed to cancel order");
  }
};

export const createNewOrder = async (
  params: CreateOrderQuery,
): Promise<Order> => {
  try {
    const response = await postData<Order>(
      `orders/${params.symbolCode}/place`,
      params,
    );
    return response;
  } catch (error) {
    console.error(`Error create order:`, error);
    throw new Error("Failed to cancel order");
  }
};

export const fetchOrderBooks = async (params?: {
  symbolCode: string;
}): Promise<OrderBookData> => {
  const response: OrderBookData = await fetchData(
    "orderbook/depth/1000",
    params,
  );
  return response;
};

export const fetchOrderHistory = async (params: {
  symbolCode: string;
}): Promise<OrderBookData> => {
  const response: OrderBookData = await fetchData(
    "orderbook/depth/1000",
    params,
  );
  return response;
};

export async function fetchOpenOrders(): Promise<Order[]> {
  const params = {
    size: 1000,
    statuses: [FetchOrderStatus.ACTIVE, FetchOrderStatus.PARTIALLY_FILLED].join(
      ",",
    ),
  };
  const response = await fetchData<ApiResponse<Order>>("orders", params);
  return response.items;
}

export async function fetchTradingMarket(
  symbol: string,
): Promise<TradingMarket[]> {
  const searchParams = {
    size: 40,
  };

  if (!symbol) {
    throw new Error("Invalid Symbol");
  }

  const response = await fetchData<ApiResponse<TradingMarket>>(
    `trades/market/${symbol}`,
    searchParams,
  );

  return response.items;
}
