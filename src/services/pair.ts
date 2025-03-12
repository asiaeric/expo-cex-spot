import { fetchData } from './api'

import { TradingPairListSchema } from '@/schemas'
import { TradingPair } from '@/types'

export const fetchTradingPair = async (
	symbol: string,
): Promise<TradingPair[]> => {
	try {
		const response = await fetchData<TradingPair[]>(
			`config/trading-pair/${symbol}`,
		)
		return TradingPairListSchema.parse(response)
	} catch (error) {
		throw new Error('Failed to fetch pairs')
	}
}
