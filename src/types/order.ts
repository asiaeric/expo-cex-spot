type OrderBookData = {
  asks: OrderPair[];
  bids: OrderPair[];
  e?: number;
};

enum OrderAction {
  BUY = "BUY",
  SELL = "SELL",
}

enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
}

enum OrderSide {
  ASKS = "ASKS",
  BIDS = "BIDS",
}

enum OrderStatus {
  ORDER_SUBMITTED = "ORDER_SUBMITTED",
  ORDER_FILLED = "ORDER_FILLED",
  ORDER_CANCEL = "ORDER_CANCEL",
  ORDER_REJECTED = "ORDER_REJECTED",
}

interface Order {
  id: number;
  userId: number;
  symbolCode: string;
  symbolName: string;
  priceFromUser: number;
  quantity: number;
  filled: number;
  action: string;
  type: string;
  status: string;
  total: number;
  fee: number;
  baseCurrency: string;
  quoteCurrency: string;
  createdAt: string;
  updatedAt: string;
  externalId: number;
  matchingPrice: number;
}

interface CreateOrderQuery {
  action: OrderAction;
  price: number;
  quantity?: number;
  symbolCode: string;
  type: OrderType;
}

interface ResponseOrders {
  items: Order[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface WSOrderData {
  action: OrderAction;
  amount: number;
  code: string;
  size: number;
  quoteCurrency: string;
  symbolName: string;
  symbol: string;
  baseCurrency: string;
  type: OrderType;
  filled: number;
  id: number;
  externalId: number;
}

interface PlaceOrderDTO {
  id: number;
  code: OrderType;
  disable: boolean;
  title: string;
  description: string;
}

type OrderPair = [number, number];

interface SearchParams {
  size: number;
  page: number;
  sortBy: string;
  statuses: string;
  startDate?: string;
  endDate?: string;
}

interface UpdateOrderFilledStatusPayload {
  id: number;
  filled: number;
}

enum FetchOrderStatus {
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  ACTIVE = "ACTIVE",
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
}

interface FetchOrderRequest {
  page: number;
  extraSize?: number;
  startDate?: string;
  endDate?: string;
}
interface OrderParams {
  action: OrderAction;
  price: number;
  quantity?: number;
  symbolCode: string;
  type: OrderType;
}

export {
  CreateOrderQuery,
  FetchOrderRequest,
  FetchOrderStatus,
  Order,
  OrderAction,
  OrderBookData,
  OrderPair,
  OrderParams,
  OrderSide,
  OrderStatus,
  OrderType,
  PlaceOrderDTO,
  ResponseOrders,
  SearchParams,
  UpdateOrderFilledStatusPayload,
  WSOrderData,
};
