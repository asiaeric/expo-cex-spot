import { useTheme } from '@/theme'
import Svg, { Path } from 'react-native-svg'

function FilterSvg() {
	const { colors } = useTheme()
	return (
		<Svg width="36px" height="36px" viewBox="0 0 0.72 0.72" fill="none">
			<Path
				d="M.54.21H.51m0 0H.48m.03 0V.18m0 .03v.03M.375.15H.18C.166.15.159.15.154.154.15.159.15.166.15.18v.059c0 .008 0 .012.002.015a.032.032 0 00.012.01l.091.06C.281.341.294.35.301.363c.007.013.007.029.007.06V.57L.413.518V.425c0-.031 0-.047.007-.06A.072.072 0 01.439.344M.6.21a.09.09 0 11-.18 0 .09.09 0 01.18 0"
				stroke={colors.gray200}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.03}
			/>
		</Svg>
	)
}

export default FilterSvg
