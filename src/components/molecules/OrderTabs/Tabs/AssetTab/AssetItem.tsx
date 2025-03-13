import { useTheme } from '@/theme'
import { Asset } from '@/types/schemas/asset'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import Animated, { LightSpeedInRight } from 'react-native-reanimated'

function AssetItem({ item }: { item: Asset }) {
	const { layout, fonts, components, gutters, backgrounds, borders } =
		useTheme()
	const { t } = useTranslation(['common'])

	const { amount, availableAmount, inUseBalance } = item.balance

	return (
		<Animated.View
			entering={LightSpeedInRight}
			style={[gutters.marginHorizontal_16, gutters.paddingVertical_16]}
		>
			<View style={[layout.row, layout.justifyBetween]}>
				<View>
					<Text style={[fonts.size_20, fonts.gray50, fonts.bold]}>
						{item?.code}
					</Text>
					<Text
						style={[
							fonts.size_12,
							gutters.marginTop_8,
							fonts.bold,
							fonts.gray200,
						]}
					>
						{item.name}
					</Text>
				</View>
			</View>
			<View
				style={[
					layout.row,
					layout.justifyBetween,
					gutters.marginTop_14,
					layout.itemsCenter,
					backgrounds.purple100,
					gutters.paddingHorizontal_12,
					gutters.paddingVertical_16,
					borders.rounded_16,
				]}
			>
				<Text style={[fonts.size_16, fonts.green, fonts.bold]}>
					{t('common:availableBalance')}
				</Text>
				<View>
					<Text style={[fonts.size_14, fonts.green, fonts.bold]}>
						{`${availableAmount} ${item.code}`}
					</Text>
				</View>
			</View>
			<View
				style={[
					layout.row,
					layout.justifyBetween,
					gutters.marginTop_14,
					layout.itemsCenter,
					backgrounds.purple100,
					gutters.paddingHorizontal_12,
					gutters.paddingVertical_16,
					borders.rounded_16,
				]}
			>
				<Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
					{t('common:inUseBalance')}
				</Text>
				<View>
					<Text
						style={[fonts.size_14, fonts.gray50, fonts.bold]}
					>{`${inUseBalance} ${item.code}`}</Text>
				</View>
			</View>
			<View
				style={[
					layout.row,
					layout.justifyBetween,
					gutters.marginTop_14,
					layout.itemsCenter,
					backgrounds.purple100,
					gutters.paddingHorizontal_12,
					gutters.paddingVertical_16,
					borders.rounded_16,
				]}
			>
				<Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
					{t('common:totalBalance')}
				</Text>
				<View>
					<Text
						style={[fonts.size_14, fonts.gray50, fonts.bold]}
					>{`${amount} ${item.code}`}</Text>
				</View>
			</View>
			<View style={[components.separator, gutters.marginTop_16]} />
		</Animated.View>
	)
}

export default AssetItem
