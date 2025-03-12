import { z } from 'zod'

import { TokenSchema } from '@/schemas'

type Token = z.infer<typeof TokenSchema>
export { Token }
