import {
	TouchableOpacity,
	View,
	Text,
	ActivityIndicator,
	Image,
	ViewStyle,
	TextStyle,
	ImageStyle,
	ImageSourcePropType,
} from 'react-native'

import { useTheme } from '../theme'
import ImageVariant from './ImageVariant'

type CustomButtonProps = {
	type?: 'regular' | 'circle' | 'image' | 'square'
	onPress: () => void
	loading?: boolean
	text?: string
	imageSource?: ImageSourcePropType
	customStyle?: ViewStyle | ViewStyle[]
	textStyle?: TextStyle
	imageStyle?: ImageStyle | ImageStyle[]
	positiveColor?: boolean
	isDisabled?: boolean
	testID?: string
}

function CustomButton(props: CustomButtonProps) {
	const { layout, gutters, components, fonts, backgrounds } = useTheme()
	const {
		type = 'regular',
		onPress,
		loading = false,
		text,
		imageSource,
		customStyle,
		textStyle,
		imageStyle,
		positiveColor,
		isDisabled = false,
		testID,
	} = props

	let buttonContent

	switch (type) {
		case 'circle':
			buttonContent = (
				<TouchableOpacity
					onPress={onPress}
					testID={testID}
					style={[components.buttonCircle, customStyle]}
				>
					<Text style={[fonts.gray200, fonts.bold, fonts.size_10, textStyle]}>
						{text}
					</Text>
				</TouchableOpacity>
			)
			break
		case 'square':
			buttonContent = (
				<TouchableOpacity
					onPress={onPress}
					testID={testID}
					style={[components.buttonSquare, customStyle]}
				>
					<Text style={[fonts.gray200, fonts.bold, fonts.size_10, textStyle]}>
						{text}
					</Text>
				</TouchableOpacity>
			)
			break
		case 'image':
			buttonContent = (
				<TouchableOpacity
					testID={testID}
					disabled={isDisabled}
					style={[gutters.marginBottom_16, layout.itemsCenter, customStyle]}
					onPress={onPress}
				>
					<Image
						source={imageSource}
						style={[components.image32, imageStyle]}
					/>
					<Text style={[fonts.gray400, fonts.bold, fonts.size_10, textStyle]}>
						{text}
					</Text>
				</TouchableOpacity>
			)
			break
		default:
			buttonContent = (
				<TouchableOpacity
					testID={testID}
					disabled={isDisabled}
					style={[
						components.button,
						positiveColor && backgrounds.success,
						customStyle,
						isDisabled && backgrounds.gray200,
					]}
					onPress={onPress}
				>
					{loading ? (
						<ActivityIndicator />
					) : (
						<View style={[layout.row, layout.itemsCenter]}>
							{imageSource && (
								<ImageVariant
									source={imageSource}
									style={[components.image24, gutters.marginRight_12]}
								/>
							)}
							<Text
								style={[
									fonts.size_16,
									fonts.gray50,
									fonts.bold,
									fonts.alignCenter,
									isDisabled && fonts.gray50,
									textStyle,
								]}
							>
								{text}
							</Text>
						</View>
					)}
				</TouchableOpacity>
			)
	}

	return buttonContent
}

export default CustomButton
