import { z } from 'zod'

import { AssetSchema, TradingPairSchema } from '@/schemas'

type Asset = z.infer<typeof AssetSchema>
type TradingPair = z.infer<typeof TradingPairSchema>

export { Asset, TradingPair }
