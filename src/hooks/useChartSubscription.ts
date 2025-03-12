import { useEffect } from 'react'
import { dispatchByronKline } from 'react-native-kline'
import { wsClient } from '@/CexSpot'
import TopicHelper from '@/ws/topic'
import { WebSocketMessage } from '@/types/socket'

export const useChartSubscription = ({
	code,
	interval,
}: {
	code: string
	interval: string
}) => {
	useEffect(() => {
		const topic = TopicHelper.chartTopic({ code, interval })
		const callback = (msg: WebSocketMessage) => {
			try {
				const item = msg.data?.k
				dispatchByronKline('update', [
					{
						amount: 0,
						open: item?.o,
						close: item?.c,
						high: item?.h,
						id: item?.t || 0 / 1000,
						low: item?.l,
						vol: item?.v,
					},
				])
			} catch (err: unknown) {
				console.log('Error in useChartSubscription', err)
			}
		}

		wsClient.subscribe(topic, callback)

		return () => {
			wsClient.unsubscribe(topic)
		}
	}, [code])
}
