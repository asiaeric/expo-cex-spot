import { OrderAction, OrderType } from "./order";

export interface TradingMarket {
  price: number;
  matchingPrice: number;
  quantity: number;
  action: OrderAction;
  type: OrderType;
  createdAt: string;
  updatedAt: string;
}
