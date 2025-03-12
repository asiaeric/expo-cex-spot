import './translations'
import { StoreProvider } from 'easy-peasy'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import GlobalModal from './components/GlobalModal'
import ApplicationNavigator from './navigators/Application'
import store, { storage } from './stores'
import { ThemeProvider } from './theme'
import CEXWebSocket from './ws/Websocket'

type Props = object

export const wsClient = CEXWebSocket.getInstance()

function CexSpot(props: Props) {
	<SafeAreaProvider>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StoreProvider store={store}>
				<ThemeProvider storage={storage}>
					<ApplicationNavigator />
					<GlobalModal />
				</ThemeProvider>
			</StoreProvider>
		</GestureHandlerRootView>
	</SafeAreaProvider>
}

export default CexSpot
