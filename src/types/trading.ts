import { OrderAction, OrderType } from "./order";

export enum TradingRole {
  MAKER = "MAKER",
  TAKER = "TAKER",
}

export interface Trading {
  id: number;
  externalId: string;
  orderId: number;
  symbolCode: string;
  symbolName: string;
  action: OrderAction;
  type: OrderType;
  matchingPrice: number;
  quantity: number;
  total: number;
  feeInQuote: number;
  feeInBase: number;
  role: TradingRole;
  baseTokenScale: number;
  quoteTokenScale: number;
  createdAt: string;
  updatedAt: string;
  baseCurrency: string;
  quoteCurrency: string;
}
