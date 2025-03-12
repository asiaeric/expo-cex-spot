import {
	NavigationContainer,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack'

import { navigationRef } from './NavigationUtils'

import { SignIn, SignUp } from '@/screens'
import { useTheme } from '@/theme'
import { ApplicationStackParamList, RouteName } from '@/types/navigation'

const Stack = createStackNavigator<ApplicationStackParamList>()

export const useAppNavigation = () => {
	return useNavigation<StackNavigationProp<ApplicationStackParamList>>()
}

export function useAppRouteParam<T extends keyof ApplicationStackParamList>() {
	const route = useRoute<RouteProp<ApplicationStackParamList, T>>()
	return route.params
}

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme()

	return (
		<NavigationContainer theme={navigationTheme} ref={navigationRef}>
			<Stack.Navigator
				key={variant}
				screenOptions={{ headerShown: false, gestureEnabled: false }}
			>
				<Stack.Screen name={RouteName.SignIn} component={SignIn} />
                <Stack.Screen name={RouteName.SignUp} component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default ApplicationNavigator
