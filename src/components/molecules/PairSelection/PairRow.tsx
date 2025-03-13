import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/theme";
import { TradingPair } from "@/types";

function SymbolRow({
  isSelected,
  item,
  onPress,
}: {
  isSelected: boolean;
  item: TradingPair;
  onPress: () => void;
}) {
  const { layout, gutters, fonts } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        layout.row,
        layout.justifyBetween,
        layout.fullWidth,
        gutters.paddingHorizontal_24,
      ]}>
      <Text
        style={[
          fonts.size_14,
          fonts.gray50,
          gutters.paddingVertical_12,
          gutters.paddingHorizontal_16,
        ]}>
        {item?.name}
      </Text>
      {/* {isSelected ? (
        <Image source={CheckImage} style={[components.image32]} />
      ) : (
        <View />
      )} */}
    </TouchableOpacity>
  );
}

export default memo(SymbolRow);
