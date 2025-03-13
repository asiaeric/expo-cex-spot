import Svg, { Rect, Path, LinearGradient, Defs, Stop } from "react-native-svg";

const SuccessToastIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect width={24} height={24} rx={6} fill="url(#paint0_linear_6_82)" />
    <Path
      d="M8.5 12.5l2 2 5-5"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_6_82"
        x1={12}
        y1={0}
        x2={12}
        y2={24}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#48CA93" />
        <Stop offset={1} stopColor="#48BACA" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SuccessToastIcon;
