import { fetchData } from './api'

import { ApiResponse, Asset } from '@/types'

const fetchUserAssets = async (): Promise<ApiResponse<Asset>> => {
	try {
		const response = await fetchData<ApiResponse<Asset>>(`assets/all`)
		return response
	} catch (error) {
		console.error('Error loading assets:', error)
		throw new Error('Failed to fetch user assets')
	}
}

export { fetchUserAssets }
