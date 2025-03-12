import { action, Action, thunk, Thunk } from 'easy-peasy'

import { fetchTradingPair } from '@/services/pair'
import { TradingPair } from '@/types'

export interface TradingPairState {
	tradingPairs: Map<string, TradingPair>
	currentPair: TradingPair | undefined
	currentAggregation: number
}

export interface TradingPairActions {
	setTradingPairs: Action<this, TradingPair[]>
	setCurrentPair: Action<this, TradingPair>
	setCurrentAggregation: Action<this, number>
}

export interface TradingPairThunks {
	fetchTradingPairs: Thunk<this>
}

export interface TradingPairModel
	extends TradingPairActions,
		TradingPairState,
		TradingPairThunks {}

export const tradingPairModel: TradingPairModel = {
	tradingPairs: new Map(),
	currentPair: undefined,
	currentAggregation: 1,
	setTradingPairs: action((state, payload) => {
		const sortedPayload = payload.sort((a, b) => {
			return a.code.localeCompare(b.code)
		})
		const tradingPairMap = new Map(sortedPayload.map(pair => [pair.code, pair]))

		state.tradingPairs = tradingPairMap
	}),
	setCurrentPair: action((state, payload) => {
		state.currentPair = payload
	}),
	setCurrentAggregation: action((state, payload) => {
		state.currentAggregation = payload
	}),
	fetchTradingPairs: thunk(async actions => {
		try {
			const response = await fetchTradingPair('BTC_ETH')
			actions.setTradingPairs(response)
			actions.setCurrentPair(response[0])
			actions.setCurrentAggregation(response[0].minBaseStep)
		} catch (err) {
			console.log(err)
		}
	}),
}
