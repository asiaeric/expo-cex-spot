import { z } from "zod";

export const KlineItemSchema = z.object({
  timestamp: z.number(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
  turnover: z.number(),
  totalBase: z.number().optional(),
  totalQuote: z.number().optional(),
  numberOfTrades: z.number().optional(),
});

export const KlineArraySchema = z.array(KlineItemSchema);
