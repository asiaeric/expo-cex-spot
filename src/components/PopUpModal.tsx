import React, { useEffect } from 'react'
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Modal,
	StyleSheet,
} from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

interface PopupModalProps {
	visible: boolean
	onDismiss: () => void
	children: React.ReactNode
}

const styles = StyleSheet.create({
	fullScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: '#000',
	},
	modalContent: {
		opacity: 0,
		transform: [{ scale: 0.8 }],
	},
})

function PopupModal({ children, onDismiss, visible }: PopupModalProps) {
	const opacity = useSharedValue(0)
	const scale = useSharedValue(0.8)

	const backdropAnimatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value * 0.6,
	}))

	const modalContentAnimatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scale: scale.value }],
	}))

	useEffect(() => {
		if (visible) {
			opacity.value = withTiming(1, { duration: 200 })
			scale.value = withTiming(1, { duration: 300 })
		} else {
			opacity.value = withTiming(0, { duration: 200 })
			scale.value = withTiming(0.8, { duration: 300 })
			Keyboard.dismiss()
		}
	}, [opacity, scale, visible])

	if (!visible) {
		return null
	}

	return (
		<Modal transparent visible={visible} onRequestClose={onDismiss}>
			<View style={styles.fullScreen}>
				<TouchableWithoutFeedback onPress={onDismiss}>
					<Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
				</TouchableWithoutFeedback>
				<Animated.View style={[styles.modalContent, modalContentAnimatedStyle]}>
					{children}
				</Animated.View>
			</View>
		</Modal>
	)
}

export default PopupModal
