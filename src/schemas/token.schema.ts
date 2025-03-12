import { z } from 'zod'

export const TokenSchema = z.object({
	token: z.string(),
	tplPartnerId: z.string(),
	tplToken: z.string(),
})
