import { z } from 'zod'

import { OrderBookDataSchema } from '@/schemas'

type OrderBookData = z.infer<typeof OrderBookDataSchema>

enum OrderAction {
	BUY = 'BUY',
	SELL = 'SELL',
}

enum OrderType {
	LIMIT = 'LIMIT',
	MARKET = 'MARKET',
}

enum OrderSide {
	ASKS = 'ASKS',
	BIDS = 'BIDS',
}

enum OrderStatus {
	ORDER_SUBMITTED = 'ORDER_SUBMITTED',
	ORDER_FILLED = 'ORDER_FILLED',
	ORDER_CANCEL = 'ORDER_CANCEL',
	ORDER_REJECTED = 'ORDER_REJECTED',
}

interface Order {
	id: number
	userId: number
	symbolCode: string
	symbolName: string
	priceFromUser: number
	quantity: number
	filled: number
	action: string
	type: string
	status: string
	total: number
	fee: number
	baseCurrency: string
	quoteCurrency: string
	createdAt: string
	updatedAt: string
	externalId: number
	matchingPrice: number
}

interface CreateOrderQuery {
	action: OrderAction
	price: number
	quantity?: number
	symbolCode: string
	type: OrderType
}

interface ResponseOrders {
	items: Order[]
	page: number
	perPage: number
	totalPages: number
}

interface WSOrderData {
	action: OrderAction
	amount: number
	code: string
	size: number
	quoteCurrency: string
	symbolName: string
	symbol: string
	baseCurrency: string
	type: OrderType
	filled: number
	id: number
	externalId: number
}

interface PlaceOrderType {
	id: number
	code: OrderType
	disable: boolean
	title: string
	description: string
}

type OrderPair = [number, number]

interface SearchParams {
	size: number
	page: number
	sortBy: string
	statuses: string
	startDate?: string
	endDate?: string
}

export {
	CreateOrderQuery,
	Order,
	OrderAction,
	OrderBookData,
	OrderPair,
	OrderSide,
	OrderStatus,
	OrderType,
	PlaceOrderType,
	ResponseOrders,
	SearchParams,
	WSOrderData,
}
