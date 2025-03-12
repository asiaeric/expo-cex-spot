import { fetchData } from './api'

import { FeeSchema } from '@/schemas'
import { Fee } from '@/types'

export const fetchFee = async (symbol: string): Promise<Fee> => {
	try {
		const response = await fetchData<Fee>(`fees/${symbol}`)
		return FeeSchema.parse(response)
	} catch (error) {
		console.error('Error loading fee:', error)
		throw new Error('Failed to fetch fee')
	}
}
