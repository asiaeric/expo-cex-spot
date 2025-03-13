import { z } from "zod";

import { AssetSchema } from "./asset.schema";

export const TradingPairSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  type: z.literal("CURRENCY_EXCHANGE_PAIR"),
  minBaseStep: z.number(),
  maxSize: z.number(),
  minTotal: z.number(),
  minQuoteStep: z.number(),
  status: z.literal("ACTIVE"),
  minPrice: z.number(),
  initPrice: z.number(),
  minQuantity: z.number(),
  baseAsset: AssetSchema,
  quoteAsset: AssetSchema,
});

export const TradingPairListSchema = z.array(TradingPairSchema);
