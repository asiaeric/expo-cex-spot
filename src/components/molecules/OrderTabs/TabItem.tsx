import { View, StyleSheet } from "react-native";
import {
  TabItemProps,
  TabName,
} from "react-native-collapsible-tab-view/lib/typescript/src/types";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { useTheme } from "@/theme";

interface TabItemPropsExtended<T extends TabName>
  extends Pick<TabItemProps<T>, "index" | "indexDecimal"> {
  label: string;
}

function TabItem<T extends TabName>({
  index,
  indexDecimal,
  label,
}: TabItemPropsExtended<T>) {
  const { fonts } = useTheme();

  const textStyle = useAnimatedStyle(() => ({
    fontWeight: Math.abs(index - indexDecimal.value) < 0.5 ? "bold" : "normal",
  }));

  return (
    <View style={styles.tabItemContainer}>
      <Animated.Text style={[fonts.gray50, textStyle]}>{label}</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TabItem;
