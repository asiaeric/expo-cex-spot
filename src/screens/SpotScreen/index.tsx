import { Text, View } from 'react-native'
import { SafeScreen } from '@/components/template'
import OrderTabs from '@/components/molecules/OrderTabs'
import { useTheme } from '@/theme'
import { BackButton } from '@/components/atoms'

const SpotScreen = () => {
	const { layout, gutters, fonts } = useTheme()

	return (
		<SafeScreen>
			<View style={[layout.row, layout.justifyBetween, gutters.marginLeft_16]}>
				<View style={[layout.row, layout.itemsCenter, gutters.marginBottom_16]}>
					<BackButton />
					<Text
						style={[
							fonts.gray50,
							fonts.size_20,
							fonts.bold,
							gutters.marginLeft_16,
						]}
					>
						Spot
					</Text>
				</View>
			</View>
			<OrderTabs displayHistory displayOpenOrder />
		</SafeScreen>
	)
}

export default SpotScreen
