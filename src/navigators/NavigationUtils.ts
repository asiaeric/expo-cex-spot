import { createNavigationContainerRef } from '@react-navigation/native'

import { ApplicationStackParamList } from '@/types/navigation'

export const navigationRef =
	createNavigationContainerRef<ApplicationStackParamList>()

export const navigate = (
	name: keyof ApplicationStackParamList,
	params?: ApplicationStackParamList[keyof ApplicationStackParamList],
): void => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params as any)
	}
}

export const reset = (
	index: number,
	routes: {
		name: keyof ApplicationStackParamList
		params?: ApplicationStackParamList[keyof ApplicationStackParamList]
	}[],
): void => {
	if (navigationRef.isReady()) {
		navigationRef.reset({
			index,
			routes,
		})
	}
}
