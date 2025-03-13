import React from "react";
import { View } from "react-native";

import SpotScene from "./SpotScene";

import { AppTabBarV2, AppTabView } from "@/components/molecules";
import { useTheme } from "@/theme";

const scenes = {
  spot: SpotScene,
};

const MarketScene = () => {
  const { layout } = useTheme();

  return (
    <View style={layout.flex_1}>
      <AppTabView
        scenes={scenes}
        renderTabBar={(props1) => (
          <AppTabBarV2 {...props1} onTabPress={props1.jumpTo} />
        )}
      />
    </View>
  );
};

export default MarketScene;
