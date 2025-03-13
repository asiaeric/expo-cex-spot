import { z } from "zod";

import { AssetSchema, TradingPairSchema } from "@/schemas";

type Asset = z.infer<typeof AssetSchema>;
type TradingPair = z.infer<typeof TradingPairSchema>;

interface ResponseTrading {
  items: TradingPair[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface FetchTradingRequest {
  page: number;
  startDate?: string;
  endDate?: string;
}

interface FilterDate {
  startDate: string | undefined;
  endDate: string | undefined;
}

export { Asset, TradingPair, ResponseTrading, FetchTradingRequest, FilterDate };
