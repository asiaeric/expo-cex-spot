import { fetchData } from "./api";

import { TradingPairListSchema } from "@/schemas";
import { TradingPair } from "@/types";

export const fetchTradingPair = async (): Promise<TradingPair[]> => {
  const response = await fetchData<TradingPair[]>("config/trading-pair");
  return TradingPairListSchema.parse(response);
};
