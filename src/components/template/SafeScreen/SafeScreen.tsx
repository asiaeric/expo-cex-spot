import { StatusBar } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

interface SafeScreenProps {
  children: React.ReactNode;
  ignoreEdge?: Edge[] | undefined;
}

function SafeScreen({ children, ignoreEdge }: SafeScreenProps) {
  const { layout, variant, navigationTheme } = useTheme();

  const edges = ignoreEdge
    ? (["bottom", "top", "left", "right"].filter(
        (e) => !ignoreEdge.includes(e as Edge),
      ) as Edge[])
    : (["bottom", "top", "left", "right"] as Edge[]);

  return (
    <SafeAreaView
      style={[
        layout.flex_1,
        { backgroundColor: navigationTheme.colors.background },
      ]}
      edges={edges}>
      <StatusBar
        barStyle={variant === "dark" ? "light-content" : "dark-content"}
        backgroundColor={navigationTheme.colors.background}
      />
      {children}
    </SafeAreaView>
  );
}

export default SafeScreen;
