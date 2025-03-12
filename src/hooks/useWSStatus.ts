import { wsClient } from '@/CexSpot'
import { useState, useEffect } from 'react'

export const useWSStatus = () => {
	const [isConnected, setIsConnected] = useState(wsClient.isConnected)

	useEffect(() => {
		// Define a function to update state on status change
		const handleStatusChange = (status: boolean) => {
			setIsConnected(status)
		}

		// Subscribe to status changes
		wsClient.addConnectionListener(handleStatusChange)

		// Cleanup function to remove the listener
		return () => {
			wsClient.removeConnectionListener(handleStatusChange)
		}
	}, [])

	return isConnected
}
