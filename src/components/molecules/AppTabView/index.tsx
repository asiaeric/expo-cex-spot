import * as React from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBarProps, TabView } from "react-native-tab-view";

interface AppTabViewProps {
  scenes: {
    [key: string]: React.ComponentType<any>;
  };
  renderTabBar?: (props: TabBarProps<any>) => React.ReactNode;
}

const AppTabView = ({ scenes, renderTabBar }: AppTabViewProps) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    Object.keys(scenes).map((key) => ({
      key,
      title: key,
    })),
  );

  const renderScene = React.useCallback(SceneMap(scenes), [scenes]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default AppTabView;
