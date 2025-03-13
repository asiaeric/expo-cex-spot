import { Text } from "react-native";

import { useWSStatus } from "@/hooks/useWSStatus";
import { useTheme } from "@/theme";

const WSStatus = () => {
  const { fonts, layout, gutters } = useTheme();
  const status = useWSStatus();
  return (
    <Text style={[fonts.bold, fonts.gray200, fonts.size_12, layout.selfCenter]}>
      {status ? "🟢 Connected" : "🔴 Disconnect"}
    </Text>
  );
};

export default WSStatus;
