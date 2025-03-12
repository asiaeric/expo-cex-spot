import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { StyleProp, TouchableOpacity, ViewProps } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withSpring,
} from 'react-native-reanimated'
import { wait } from '@/utils/helpers'

const COLOR_ACTIVE_TIME = 2000
const baseColor = '#BABABA'
const activeColor = '#00c28b'

interface ICopyButtonProps {
	customStyle?: StyleProp<ViewProps>
	value: string | number
}

function CopyButton({ customStyle, value }: ICopyButtonProps) {
	const [color, setColor] = React.useState(baseColor)
	const scale = useSharedValue(1)

	React.useEffect(() => {
		if (color === activeColor) {
			scale.value = withSequence(withSpring(1.15), withSpring(1))
		}
	}, [color])

	const rStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value,
			},
		],
	}))

	const handleOnCopy = async () => {
		Clipboard.setString(value.toString())
		setColor(activeColor)
		await wait(COLOR_ACTIVE_TIME)
		setColor(baseColor)
	}

	return (
		<Animated.View style={rStyle}>
			<TouchableOpacity
				disabled={color === activeColor}
				style={customStyle}
				onPress={handleOnCopy}
			>
				<Svg
					width={14}
					height={14}
					viewBox="0 0 14 14"
					fill="none"
					stroke={color}
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<Path d="M0 0h14v14H0z" stroke="none" />
					<Path d="M4.083 5.639a1.556 1.556 0 011.556-1.556h5.055a1.556 1.556 0 011.556 1.556v5.055a1.556 1.556 0 01-1.556 1.556H5.639a1.556 1.556 0 01-1.556-1.556z" />
					<Path d="M2.34 9.763a1.167 1.167 0 01-.59-1.013V2.917A1.17 1.17 0 012.917 1.75H8.75c.438 0 .675.225.875.583" />
				</Svg>
			</TouchableOpacity>
		</Animated.View>
	)
}

export default CopyButton
