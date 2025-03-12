import dayjs from 'dayjs'

import {
	ChartLabelTimeline,
	IChartIndicator,
	OrderType,
	PlaceOrderType,
} from '../types'
import { DATE_FORMATS } from './dateFormats'

export const PLACE_ORDER_TYPES: PlaceOrderType[] = [
	{
		id: 0,
		code: OrderType.LIMIT,
		disable: false,
		title: 'order:limit',
		description: 'order:limitDescription',
	},
	{
		id: 1,
		code: OrderType.MARKET,
		disable: false,
		title: 'order:market',
		description: 'order:marketDescription',
	},
]

export const CHART_TIMELINE: ChartLabelTimeline[] = [
	{
		label: '1m',
		id: '1m',
	},
	{
		label: '5m',
		id: '5m',
	},
	{
		label: '15m',
		id: '15m',
	},
	{
		label: '1H',
		id: '1h',
	},
	{
		label: '4H',
		id: '4h',
	},
	{
		label: '1D',
		id: '1d',
	},
	{
		label: '1W',
		id: '1w',
	},
]

export const CHART_INDICATORS: IChartIndicator[] = [
	{
		label: 'MA',
		id: 'MA',
	},
	{
		label: 'EMA',
		id: 'EMA',
	},
	{
		label: 'BOLL',
		id: 'BOLL',
	},
	{
		label: 'SAR',
		id: 'SAR',
	},
	{
		label: 'AVL',
		id: 'AVL',
	},
]

export const NUMBER_BARS_QUERY = 500

export const initialFilter = {
	startDate: dayjs().format(DATE_FORMATS.DATE_TIME),
	endDate: dayjs().format(DATE_FORMATS.DATE_TIME),
}

export const EN_LANG = 'en-US'
export const VI_LANG = 'vi-VN'
