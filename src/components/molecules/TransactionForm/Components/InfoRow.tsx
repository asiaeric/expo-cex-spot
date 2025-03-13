import { Text, View } from "react-native";

import { useTheme } from "@/theme";

interface Props {
  title: string;
  value: string | number | undefined;
  affix?: string;
}

const InfoRow = ({ title, value, affix }: Props) => {
  const { layout, gutters, fonts } = useTheme();
  return (
    <View style={[layout.row, layout.justifyBetween, gutters.marginTop_12]}>
      <Text style={[fonts.gray400, fonts.size_12]}>{title}</Text>
      <Text style={[fonts.gray50, fonts.size_12]}>
        {value} {affix}
      </Text>
    </View>
  );
};

export default InfoRow;
