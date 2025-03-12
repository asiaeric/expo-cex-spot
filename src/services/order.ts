import { deleteData, fetchData, postData } from './api'

import { CreateOrderQuery, Order, OrderBookData } from '@/types'

export const cancelOrderById = async (id: number): Promise<any> => {
	try {
		return await deleteData(`orders/${id}`)
	} catch (error) {
		console.error(`Error canceling order ${id}:`, error)
		throw new Error('Failed to cancel order')
	}
}

export const createNewOrder = async (
	params: CreateOrderQuery,
): Promise<Order> => {
	try {
		const response = await postData<Order>(
			`orders/${params.symbolCode}/place`,
			params,
		)
		return response
	} catch (error) {
		console.error(`Error create order:`, error)
		throw new Error('Failed to cancel order')
	}
}

export const fetchOrderBooks = async (params: {
	symbolCode: string
}): Promise<OrderBookData> => {
	const response: OrderBookData = await fetchData(
		'orderbook/depth/1000',
		params,
	)
	return response
}

export const fetchOrderHistory = async (params: {
	symbolCode: string
}): Promise<OrderBookData> => {
	const response: OrderBookData = await fetchData(
		'orderbook/depth/1000',
		params,
	)
	return response
}
