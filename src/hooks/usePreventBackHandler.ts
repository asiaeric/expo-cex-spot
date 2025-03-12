import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'

const usePreventBackNavigation = () => {
	const isFocused = useIsFocused()
	useEffect(() => {
		const handleBackPress = () => true
		if (isFocused)
			BackHandler.addEventListener('hardwareBackPress', handleBackPress)

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
		}
	}, [isFocused])
}

export default usePreventBackNavigation
