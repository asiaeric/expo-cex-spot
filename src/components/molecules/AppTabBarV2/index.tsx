import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { TabBarProps } from "react-native-tab-view";

import { AppText } from "@/components/atoms";
import { useTheme } from "@/theme";

interface AppTabBarV2Props extends TabBarProps<any> {
  onTabPress: (params: { route: any }) => void;
}

const AppTabBarV2: React.FC<AppTabBarV2Props> = ({
  navigationState,
  onTabPress,
}) => {
  const { layout, fonts, gutters } = useTheme();
  const { t } = useTranslation(["common"]);
  return (
    <View
      style={[layout.row, gutters.marginTop_12, gutters.paddingHorizontal_14]}>
      {navigationState.routes.map((route, index) => {
        const isActive = navigationState.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={[layout.itemsCenter, layout.justifyEnd]}
            onPress={() => onTabPress({ route })}>
            <AppText.H5 style={!isActive ? [fonts.dark400] : []}>
              {t(route.title)}
            </AppText.H5>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AppTabBarV2;
