import { z } from 'zod'

export const ApiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
	z.object({
		page: z.number(),
		size: z.number(),
		totalItems: z.number(),
		totalPages: z.number(),
		items: z.array(itemSchema),
	})
