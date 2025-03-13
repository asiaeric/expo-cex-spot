import Svg, { Path, Circle } from "react-native-svg";

import { useTheme } from "@/theme";

function EyeDisplay({ isOpen = false }: { isOpen: boolean }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.gray200}
      strokeWidth={0.8}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx={12} cy={12} r={3} />
      {!isOpen && <Path d="M3 3L21 21" />}
    </Svg>
  );
}

export default EyeDisplay;
