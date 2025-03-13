import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { TabBarProps } from "react-native-tab-view";

import { AppText } from "@/components/atoms";
import { useTheme } from "@/theme";

interface AppTabBarProps extends TabBarProps<any> {
  onTabPress: (params: { route: any }) => void;
}

const AppTabBar: React.FC<AppTabBarProps> = ({
  navigationState,
  onTabPress,
}) => {
  const { layout, fonts, borders, components, gutters } = useTheme();
  const { t } = useTranslation(["common"]);

  return (
    <View style={[layout.row, borders.bottom_1, borders.neutral400]}>
      {navigationState.routes.map((route, index) => {
        const isActive = navigationState.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={[layout.flex_1, layout.itemsCenter, layout.justifyEnd]}
            onPress={() => onTabPress({ route })}>
            <AppText.H5 style={!isActive ? [fonts.dark400] : []}>
              {t(route.title)}
            </AppText.H5>
            <View style={[components.tabBarIndicator, gutters.marginTop_8]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AppTabBar;
