import { ViewStyle } from 'react-native'

import { deviceHeight, deviceWidth } from '@/types/theme/responsive'

export default {
	col: {
		flexDirection: 'column',
	},
	colReverse: {
		flexDirection: 'column-reverse',
	},
	wrap: {
		flexWrap: 'wrap',
	},
	overflowHidden: {
		overflow: 'hidden',
	},
	row: {
		flexDirection: 'row',
	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	selfCenter: {
		alignSelf: 'center',
	},
	selfLeft: {
		alignSelf: 'flex-start',
	},
	selfRight: {
		alignSelf: 'flex-end',
	},
	itemsCenter: {
		alignItems: 'center',
	},
	itemsStart: {
		alignItems: 'flex-start',
	},
	itemsStretch: {
		alignItems: 'stretch',
	},
	itemsEnd: {
		alignItems: 'flex-end',
	},
	justifyCenter: {
		justifyContent: 'center',
	},
	justifyAround: {
		justifyContent: 'space-around',
	},
	justifyBetween: {
		justifyContent: 'space-between',
	},
	justifyEnd: {
		justifyContent: 'flex-end',
	},
	justifyStart: {
		justifyContent: 'flex-start',
	},
	/* Sizes Layouts */
	flex_0: {
		flex: 0,
	},
	flex_1: {
		flex: 1,
	},
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},
	halfWidth: {
		width: '50%',
	},
	halfHeight: {
		height: '50%',
	},
	flexGrow: {
		flexGrow: 1,
	},
	/* Positions */
	relative: {
		position: 'relative',
	},
	absolute: {
		position: 'absolute',
	},
	top0: {
		top: 0,
	},
	top68: {
		top: 68,
	},
	bottom0: {
		bottom: 0,
	},
	left0: {
		left: 0,
	},
	left16: {
		left: 16,
	},
	left32: {
		left: 32,
	},
	right0: {
		right: 0,
	},
	right16: {
		right: 16,
	},
	zm1: {
		zIndex: -1,
	},
	z1: {
		zIndex: 1,
	},
	z10: {
		zIndex: 10,
	},
	z100: {
		zIndex: 100,
	},
	height_230: {
		height: 230,
	},
	halfScreen: {
		height: deviceHeight / 2,
	},
} as const satisfies Record<string, ViewStyle>
