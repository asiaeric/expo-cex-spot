import { useAppNavigation } from '@/navigators/Application'
import { useTheme } from '@/theme'
import BackImage from '@/theme/assets/images/back.png'
import { Image, TouchableOpacity, View } from 'react-native'

interface Props {
	isAbsolute?: boolean
}

function BackButton({ isAbsolute }: Props) {
	const navigation = useAppNavigation()
	const { components, layout, colors } = useTheme()

	return (
		<View
			style={
				isAbsolute && [
					layout.absolute,
					layout.left32,
					layout.top68,
					layout.z100,
				]
			}
		>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Image
					source={BackImage}
					style={[components.image32, { tintColor: colors.gray200 }]}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default BackButton
