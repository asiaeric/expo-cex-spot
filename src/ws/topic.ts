function orderBookTopic(currentSymbol: string, depth: number): string {
	return `/topic/order-book/${currentSymbol}_${depth}`
}

function tradeMarket(currentSymbol: string): string {
	return `/topic/market-trade/${currentSymbol}`
}

function chartTopic({
	code,
	interval,
}: {
	code: string
	interval: string
}): string {
	return `${code}@kline_${interval}`
}

function statistic(code: string): string {
	return `${code}@miniTicker`
}

const TopicHelper = {
	orderBookTopic,
	chartTopic,
	statistic,
	tradeMarket,
}

export default TopicHelper
