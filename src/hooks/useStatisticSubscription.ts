import { wsClient } from '@/CexSpot'
import { useStoreActions } from '@/stores/hooks'
import { Statistic } from '@/types'
import { WebSocketMessage } from '@/types/socket'
import TopicHelper from '@/ws/topic'
import { useEffect } from 'react'

export const useStatisticSubscription = ({ code }:{ code:string }) => {
	const { setPairStatistic } = useStoreActions(store => store.statisticModel)
	useEffect(() => {
		const topic = TopicHelper.statistic(code)
		const callback = (msg: WebSocketMessage) => {
			setPairStatistic(msg.data as Statistic)
		}

		wsClient.subscribe(topic, callback)

		return () => {
			wsClient.unsubscribe(topic)
		}
	}, [code])
}
