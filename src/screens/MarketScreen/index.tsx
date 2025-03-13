import React from "react";
import { StyleSheet } from "react-native";

import MarketScene from "./MarketScene";

import { AppTabBar, AppTabView } from "@/components/molecules";
import { SafeScreen } from "@/components/template";

const scenes = {
  market: MarketScene,
};

const MarketScreen = () => {
  return (
    <SafeScreen ignoreEdge={["bottom"]}>
      <AppTabView
        scenes={scenes}
        renderTabBar={(props1) => (
          <AppTabBar {...props1} onTabPress={props1.jumpTo} />
        )}
      />
    </SafeScreen>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({});
