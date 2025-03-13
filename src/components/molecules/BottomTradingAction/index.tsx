import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { CustomButton } from "@/components/atoms";
import { useAppNavigation } from "@/navigators/Application";
import { useTheme } from "@/theme";
import { OrderAction } from "@/types";
import { RouteName } from "@/types/navigation";

function BottomTradingAction() {
  const { t } = useTranslation("common");
  const { layout, backgrounds, gutters } = useTheme();
  const navigation = useAppNavigation();

  return (
    <Animated.View
      entering={FadeInDown.springify().delay(500)}
      style={[layout.row, layout.justifyAround, gutters.paddingVertical_12]}>
      <CustomButton
        text={t("buy")}
        customStyle={[styles.actionWidth, backgrounds.green]}
        onPress={() => {
          navigation.navigate(RouteName.Transaction, {
            transactionType: OrderAction.BUY,
          });
        }}
      />
      <CustomButton
        text={t("sell")}
        customStyle={[styles.actionWidth, backgrounds.red500]}
        onPress={() => {
          navigation.navigate(RouteName.Transaction, {
            transactionType: OrderAction.SELL,
          });
        }}
      />
    </Animated.View>
  );
}

export default BottomTradingAction;

const styles = StyleSheet.create({
  actionWidth: {
    width: "40%",
  },
});
