import { z } from 'zod'

export const FeeSchema = z.object({
	symbolCode: z.string(),
	makerFee: z.number(),
	takerFee: z.number(),
})
