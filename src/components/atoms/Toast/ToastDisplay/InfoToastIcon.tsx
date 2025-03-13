import Svg, {
  Rect,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const InfoToastIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect width={24} height={24} rx={6} fill="url(#paint0_linear_6_137)" />
    <Path d="M12 16v-5" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx={1} cy={1} r={1} transform="matrix(1 0 0 -1 11 9)" fill="#fff" />
    <Defs>
      <LinearGradient
        id="paint0_linear_6_137"
        x1={12}
        y1={-4.5}
        x2={12}
        y2={28}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#4DCAFF" />
        <Stop offset={1} stopColor="#4EA3E0" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default InfoToastIcon;
