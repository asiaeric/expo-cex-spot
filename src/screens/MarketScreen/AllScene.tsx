import { AppText } from '@/components/atoms'
import { PairCard } from '@/components/molecules'
import { useStoreState } from '@/stores/hooks'
import { useTheme } from '@/theme'
import { SymbolDepth } from '@/types/schemas/symbol'
import { FlashList } from '@shopify/flash-list'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

const ItemSeparator = () => {
	const { gutters } = useTheme()
	return <View style={gutters.marginBottom_10} />
}

const AllScene = () => {
	const { layout, gutters, fonts } = useTheme()
	const { symbols } = useStoreState(store => store.orderBookModel)
	const { t } = useTranslation(['common'])

	const Header = useCallback(() => {
		return (
			<View
				style={[
					layout.row,
					layout.justifyBetween,
					gutters.marginVertical_12,
					gutters.marginHorizontal_14,
				]}
			>
				<AppText.SubTitle style={fonts.neutral300}>
					{t('common:nameVol')}
				</AppText.SubTitle>
				<View style={[layout.row, layout.justifyBetween]}>
					<AppText.SubTitle style={[gutters.marginRight_40, fonts.neutral300]}>
						{t('common:lastPrice')}
					</AppText.SubTitle>
					<View style={[{ width: 80 }, layout.itemsEnd]}>
						<AppText.SubTitle style={fonts.neutral300}>
							{t('common:24hChange')}
						</AppText.SubTitle>
					</View>
				</View>
			</View>
		)
	}, [])

	const renderItem = ({ item }: { item: SymbolDepth }) => {
		return <PairCard pair={item} />
	}

	return (
		<View style={layout.flex_1}>
			<Header />
			<FlashList
				contentContainerStyle={gutters.paddingHorizontal_14}
				data={symbols}
				renderItem={renderItem}
				estimatedItemSize={200}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</View>
	)
}

export default AllScene
