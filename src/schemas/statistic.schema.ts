import { z } from 'zod'

export const StatisticSchema = z.object({
	s: z.string(), // Symbol, e.g., "BTC_USDT"
	e: z.string(), // Event type, e.g., "24hrMiniTicker"
	t: z.number(), // Timestamp (Epoch time in milliseconds)
	c: z.number(), // Current price
	h: z.number(), // High price
	l: z.number(), // Low price
	o: z.number(), // Open price
	v: z.number(), // Volume in base asset
	q: z.number(), // Quote asset volume
	priceChange: z.number()?.optional(),
	percentPriceChange: z.number()?.optional(),
	trend: z.string()?.optional(),
})

export const StatisticsArraySchema = z.array(StatisticSchema)
