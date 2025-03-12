import { z } from 'zod'

export const OrderPairSchema = z.object({
	price: z.number(),
	amount: z.number(),
})

export const OrderBookDataSchema = z.object({
	bids: z.array(OrderPairSchema),
	asks: z.array(OrderPairSchema),
	e: z.number(),
})
