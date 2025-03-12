import { useTheme } from '@/theme'
import { memo, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

type Props = {
	message?: string
	showTooltip?: boolean
}

const Tooltip = ({ message, showTooltip }: Props) => {
	const { components } = useTheme()
	const [show, setShow] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		if (message) {
			setErrorMessage(message)
			setShow(true)
			const timer = setTimeout(() => {
				setShow(false)
			}, 5000)

			return () => clearTimeout(timer)
		}
		setShow(false)
	}, [message])

	if (!showTooltip) return null

	return (
		show && (
			<View style={components.containerTooltip}>
				<View style={components.tooltip}>
					<Text>{errorMessage}</Text>
				</View>
				<View style={components.arrow} />
			</View>
		)
	)
}

export default memo(Tooltip)
