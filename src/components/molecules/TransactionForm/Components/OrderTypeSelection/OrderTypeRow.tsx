import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/theme";
import { OrderType, PlaceOrderDTO } from "@/types";

function OrderTypeRow({
  isSelected,
  item,
  onPress,
}: {
  isSelected: boolean;
  item: PlaceOrderDTO;
  onPress: () => void;
}) {
  const { t } = useTranslation(["order"]);
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
        {item.code === OrderType.LIMIT ? t("order:limit") : t("order:market")}
      </Text>
      {/* {isSelected ? (
        <Image source={CheckImage} style={[components.image32]} />
      ) : (
        <View />
      )} */}
    </TouchableOpacity>
  );
}

export default memo(OrderTypeRow);
