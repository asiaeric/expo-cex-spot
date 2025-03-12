import { Action, Thunk, action, thunk } from 'easy-peasy'

import { Model } from '.'

import { Asset } from '@/types'

export interface AssetsState {
	assets: Asset[]
	error: string
}

export interface AssetsActions {
	setAssets: Action<this, Asset[]>
	setError: Action<this, string>
}

export interface AssetsThunks {
	fetchAssets: Thunk<this, undefined, any, Model>
}

export interface AssetsModel extends AssetsState, AssetsActions, AssetsThunks {}

export const assetModel: AssetsModel = {
	// Assets
	assets: [],
	setAssets: action((state, payload) => {
		state.assets = payload
	}),
	fetchAssets: thunk(async (actions, payload, { getStoreState }) => {
		try {
			//   const { currentSymbol } = getStoreState().orderBookModel;
			//   if (currentSymbol) {
			//     const response = await fetchUserAssets();
			//     actions.setAssets(response.items);
			//   } else {
			//     throw new Error("Invalid asset");
			//   }
		} catch (err) {}
	}),

	// Error
	error: '',
	setError: action((state, payload) => {
		state.error = payload
	}),
}
