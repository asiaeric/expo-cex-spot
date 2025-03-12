import { useTheme } from '@/theme'
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetModalProps,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type CustomBottomSheetProps = BottomSheetModalProps & {
	children?: React.ReactNode
	// onShow?: () => void
	// onSwipeClose?: () => void
}

export type BottomSheetRefProps = {
	open: () => void
	close: () => void
}

const CustomBottomSheet = forwardRef<
	BottomSheetRefProps,
	CustomBottomSheetProps
>(({ children, ...rest }, ref) => {
	const { backgrounds } = useTheme()
	const { bottom } = useSafeAreaInsets()

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const close = useCallback(() => {
		bottomSheetModalRef.current?.close()
	}, [])

	const open = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])

	useImperativeHandle(ref, () => ({ open, close }), [open, close])

	const renderBackdrop = useCallback(
		(backdropProps: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...backdropProps}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[],
	)

	return (
		<BottomSheetModal
			enableDynamicSizing
			backdropComponent={renderBackdrop}
			ref={bottomSheetModalRef}
			enablePanDownToClose
			backgroundStyle={backgrounds.background900}
			handleIndicatorStyle={backgrounds.gray50}
			keyboardBehavior="interactive"
			keyboardBlurBehavior="restore"
			android_keyboardInputMode="adjustResize"
			{...rest}
		>
			<BottomSheetView style={{ paddingBottom: bottom }}>
				{children}
			</BottomSheetView>
		</BottomSheetModal>
	)
})

export default CustomBottomSheet
