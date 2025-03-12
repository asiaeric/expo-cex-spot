/* eslint-disable no-nested-ternary */
import { Action, Thunk, action, thunk } from 'easy-peasy'
import { enableMapSet } from 'immer'

import { Statistic } from '@/types'

enableMapSet()
export interface StatisticState {
	statistics: Map<string, Statistic>
	error: string
}

export interface StatisticActions {
	setStatistics: Action<this, Statistic[]>
	setPairStatistic: Action<this, Statistic>
	setError: Action<this, string>
}

export interface StatisticThunks {
	getStatistics: Thunk<this>
}
export interface StatisticModel
	extends StatisticState,
		StatisticActions,
		StatisticThunks {}

export const statisticModel: StatisticModel = {
	// Statistic
	statistics: new Map(),
	setStatistics: action((state, payload) => {
		const processedArray = payload.map((item: Statistic) => {
			const priceChange = item.c - item.o
			const percentPriceChange = (priceChange / item.o) * 100
			const trend =
				percentPriceChange > 0
					? 'up'
					: percentPriceChange < 0
						? 'down'
						: 'equal'

			return { ...item, priceChange, percentPriceChange, trend }
		})
		const miniTickerMap = new Map(
			processedArray.map(ticker => [ticker.s, ticker]),
		)
		state.statistics = miniTickerMap
	}),
	setPairStatistic: action((state, payload) => {
		if (payload) {
			const priceChange = payload.c - payload.o || 0
			const percentPriceChange = (priceChange / payload.o) * 100
			if (percentPriceChange > 0) {
				payload.trend = 'up'
			} else if (percentPriceChange < 0) {
				payload.trend = 'down'
			} else {
				payload.trend = 'equal'
			}
			payload.percentPriceChange = percentPriceChange
			payload.priceChange = priceChange
			state.statistics.set(payload.s, payload)
		}
	}),
	getStatistics: thunk(async actions => {
		try {
			// const response = await fetchStatistic()
			// actions.setStatistics(response)
		} catch (err) {
			actions.setError(err.message)
		}
	}),

	// Error
	error: '',
	setError: action((state, payload) => {
		state.error = payload
	}),
}
