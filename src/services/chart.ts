import { fetchData } from './api'

import { KlineArraySchema } from '@/schemas'
import { ChartQuery, KlineItem } from '@/types'

export const getChartHistory = async (
	params: ChartQuery,
): Promise<KlineItem[]> => {
	try {
		const response = await fetchData('chart/klines', params)
		const json = Array.isArray(response) ? response : []
		const finalRes: KlineItem[] = []
		if (json.length) {
			json.forEach((element: any) => {
				const [
					openTime,
					open,
					high,
					low,
					close,
					volume,
					closeTime,
					totalBase,
					numberOfTrades,
					totalQuote,
				] = element
				const turnover =
					((Number(open) + Number(high) + Number(low) + Number(close)) / 4) *
					Number(volume)
				finalRes.push({
					open: Number(open),
					high: Number(high),
					low: Number(low),
					close: Number(close),
					volume: Number(volume),
					turnover,
					timestamp: openTime,
					totalBase: Number(totalBase),
					totalQuote: Number(totalQuote),
					numberOfTrades: Number(numberOfTrades),
				})
			})
		}
		return KlineArraySchema.parse(finalRes)
	} catch (error) {
		throw new Error(`Get history chart error: ${(error as Error).message}`)
	}
}
