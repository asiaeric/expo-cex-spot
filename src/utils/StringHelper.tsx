import { Order, WSOrderData } from '@/types'
import { t } from 'i18next'

/* eslint-disable radix */
export function wait(timeout: number): Promise<any> {
	return new Promise(resolve => {
		setTimeout(resolve, timeout)
	})
}

export function socketParse(params: string) {
	const [headers, body] = params.split('\n\n')
	const headersObj = headers.split('\n').reduce((acc: any, header) => {
		if (header.includes(':')) {
			const [key, value] = header.split(':')
			acc[key.trim()] = value.trim()
		} else {
			acc.command = header
		}

		return acc
	}, {})

	let bodyObj = {}
	try {
		// eslint-disable-next-line no-control-regex
		bodyObj = JSON.parse(body.replace(/\u0000$/, ''))
	} catch (error) {
		bodyObj = body
	}
	return {
		// command:
		headers: headersObj,
		body: bodyObj,
	}
}

export function validateField(
	schema: any,
	field: string,
	value: string,
): string {
	if (!value.trim()) {
		const fieldName =
			String(field).charAt(0).toUpperCase() + String(field).slice(1)

		return t('login:fieldRequired', { field: fieldName })
	}

	const fieldSchema = schema.pick({ [field as any]: true })

	const validationResult = fieldSchema.safeParse({ [field]: value })

	if (!validationResult.success) {
		const errorMap = validationResult.error.flatten().fieldErrors
		const errorMessage = errorMap[field as keyof typeof errorMap]

		return errorMessage ? errorMessage[0] : ''
	}
	return ''
}

export function formatNumberDisplay(
	num?: number,
	decimals = 2,
	convertToAbbreviation = false,
) {
	if (num === undefined || num === null) {
		return '0'
	}

	if (!convertToAbbreviation || num < 1000000) {
		return num.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
			useGrouping: true,
		})
	}

	const abbreviations = ['M', 'B', 'T']
	const order = Math.floor(Math.log10(num) / 3) - 2

	if (order < 0) {
		return num.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		})
	}

	const formattedNumber = (num / 1000 ** (order + 2)).toFixed(decimals)
	return `${formattedNumber}${abbreviations[order]}`
}

export const formatCurrency = (
	number: number,
	{ decimals = 4, delimiter = ',', intOnly = false, isRound = false } = {},
) => {
	'worklet'

	const num = intOnly ? Math.floor(number) : parseFloat(`${number}`)
	// eslint-disable-next-line no-restricted-globals
	if (isNaN(num) || num === 0) {
		return '0'
	}
	const sign = num < 0 ? '-' : ''
	const abs = Math.abs(num)
	const int = Math.floor(abs)
	let dec = Math.floor(
		parseFloat((abs - int).toFixed(decimals + 1)) * 10 ** decimals,
	)
	if (isRound && dec > 0) {
		// eslint-disable-next-line no-plusplus
		dec++
	}
	const decStr = intOnly
		? ''
		: dec.toString().padStart(decimals, '0').replace(/0+$/, '')
	const intStr = int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
	return `${sign}${intStr}${decStr.length > 0 && !intOnly ? '.' : ''}${decStr}`
}

export function parseCandlestick(candlestick: any) {
	const time = new Date(parseInt(candlestick[0])).toISOString().slice(0, 10) // Convert timestamp to ISO date format
	const open = parseFloat(candlestick[1]) // Convert to float
	const high = parseFloat(candlestick[2]) // Convert to float
	const low = parseFloat(candlestick[3]) // Convert to float
	const close = parseFloat(candlestick[4]) // Convert to float
	const volume = parseFloat(candlestick[5]) // Convert to float
	const quoteVolume = parseFloat(candlestick[6]) // Convert to float
	const buyVolume = parseFloat(candlestick[7]) // Convert to float
	const sellVolume = parseFloat(candlestick[8]) // Convert to float

	return {
		time,
		open,
		high,
		low,
		close,
		volume,
		quoteVolume,
		buyVolume,
		sellVolume,
	}
}

export function parseWSOrder(wsOrder: WSOrderData): Order | null {
	return {
		action: wsOrder.action,
		priceFromUser: wsOrder.amount,
		type: wsOrder.type,
		quantity: wsOrder.size,
		symbolName: wsOrder.symbolName,
		symbolCode: wsOrder.symbol,
		id: wsOrder.id,
		filled: wsOrder.filled,
		baseCurrency: wsOrder.baseCurrency,
		quoteCurrency: wsOrder.quoteCurrency,
		externalId: wsOrder.externalId,
	} as Order
}

export function displayDate(dateString: string) {
	if (!dateString) return ''

	const date = new Date(dateString)
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
}

export function displayTime(dateString: string) {
	if (!dateString) return ''

	const date = new Date(dateString)

	const formatter = new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false, // Use 24-hour time format
	})

	return formatter.format(date)
}

export function ignoreErrorVirtualList() {
	if (__DEV__) {
		const ignoreWarns = [
			'VirtualizedLists should never be nested inside plain ScrollViews',
		]

		// eslint-disable-next-line @typescript-eslint/unbound-method
		const errorWarn = global.console.error
		global.console.error = (...arg) => {
			// eslint-disable-next-line no-restricted-syntax
			for (const error of ignoreWarns) {
				// if (arg[0].startsWith(error)) {
				// 	return
				// }
			}
			errorWarn(...arg)
		}
	}
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const roundNumber = (
	money = 0,
	precision = 0,
	isRoundDown = false,
	range = 1,
) => {
	const roundFunc = isRoundDown ? Math.floor : Math.ceil
	return (
		(roundFunc(money * 10 ** precision) / (range * 10 ** precision)) * range
	)
}

export function replaceLastComma(str: string) {
	if (str.charAt(str.length - 1) === ',') {
		return `${str.slice(0, -1)}.`
	}
	return str
}
