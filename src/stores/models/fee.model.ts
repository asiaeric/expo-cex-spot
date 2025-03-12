import { action, Action, thunk, Thunk } from 'easy-peasy'

import { fetchFee } from '@/services/fee'
import { Fee } from '@/types'

export interface FeeState {
	fee: Fee | undefined
}

export interface FeeActions {
	setPairFee: Action<this, Fee>
}

export interface FeeThunks {
	getFee: Thunk<this, string>
}

export interface FeeModel extends FeeActions, FeeState, FeeThunks {}

export const feeModel: FeeModel = {
	fee: undefined,
	setPairFee: action((state, payload) => {
		state.fee = payload
	}),
	getFee: thunk(async actions => {
		try {
			const response = await fetchFee('BTC')
			actions.setPairFee(response)
		} catch (err) {
			console.log(err)
		}
	}),
}
