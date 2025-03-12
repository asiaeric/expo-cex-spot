import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg'

const CancelToastIcon = () => (
	<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
		<Rect width={24} height={24} rx={6} fill="url(#paint0_linear_6_149)" />
		<Path
			d="M15 9l-6 6m0-6l6 6"
			stroke="#fff"
			strokeWidth={1.5}
			strokeLinecap="round"
		/>
		<Defs>
			<LinearGradient
				id="paint0_linear_6_149"
				x1={12}
				y1={0}
				x2={12}
				y2={24}
				gradientUnits="userSpaceOnUse"
			>
				<Stop stopColor="#E88B76" />
				<Stop offset={1} stopColor="#CA5048" />
			</LinearGradient>
		</Defs>
	</Svg>
)
export default CancelToastIcon
