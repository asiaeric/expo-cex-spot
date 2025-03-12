import {
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { useTheme } from '@/theme'
import Animated from 'react-native-reanimated'
import { useState } from 'react'
import EyeDisplay from '../../svg/EyeDisplaySvg'

type CustomTextInputProps = TextInputProps & {
	customStyle?: ViewStyle | ViewStyle[]
	centerText?: boolean
	title?: string
	type?: 'default' | 'small'
}
function CustomTextInput(props: CustomTextInputProps) {
	const { components, fonts, colors, gutters, layout } = useTheme()
	const {
		customStyle,
		centerText,
		title,
		type = 'default',
		secureTextEntry,
		...rest
	} = props

	const isDefaultType = type === 'default'
	const isPassword = !!secureTextEntry
	const [showPassword, setShowPassword] = useState(!isPassword)

	return (
		<Animated.View style={[customStyle]}>
			{title && (
				<Text
					style={[
						isDefaultType ? fonts.size_16 : fonts.size_12,
						fonts.gray800,
						fonts.bold,
						gutters.marginBottom_12,
						isDefaultType ? gutters.marginTop_32 : gutters.marginTop_24,
					]}
				>
					{title}
				</Text>
			)}
			<View style={[layout.row, layout.itemsCenter]}>
				<TextInput
					autoCapitalize="none"
					// autoFocus
					style={[
						isDefaultType ? components.textInput : components.textInput,
						centerText && fonts.alignCenter,
					]}
					secureTextEntry={!showPassword}
					placeholderTextColor={colors.gray200}
					{...rest}
				/>
				{isPassword && (
					<TouchableOpacity
						hitSlop={5}
						style={[layout.absolute, layout.right16]}
						onPress={() => {
							setShowPassword(!showPassword)
						}}
					>
						<EyeDisplay isOpen={showPassword} />
					</TouchableOpacity>
				)}
			</View>
		</Animated.View>
	)
}

export default CustomTextInput
