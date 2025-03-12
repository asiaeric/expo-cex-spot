import { useTheme } from '@/theme'
import { useWSStatus } from '@/ws/hooks/useWSStatus'
import { Text } from 'react-native'

const WSStatus = () => {
	const { fonts, layout, gutters } = useTheme()
	const status = useWSStatus()
	return (
		<Text style={[fonts.bold, fonts.gray200, fonts.size_12, layout.selfCenter]}>
			{status ? '🟢 Connected' : '🔴 Disconnect'}
		</Text>
	)
}

export default WSStatus
