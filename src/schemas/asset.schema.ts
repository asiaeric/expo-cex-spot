import { z } from "zod";

export const BalanceSchema = z.object({
  amount: z.number(),
  availableAmount: z.number(),
  inUseBalance: z.number(),
  type: z.enum(["SPOT"]),
});

export const AssetSchema = z.object({
  code: z.string(),
  name: z.string(),
  decimals: z.number(),
  imgUrl: z.string(),
  precision: z.number(),
});
