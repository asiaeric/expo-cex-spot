import LottieView from "lottie-react-native";

import { useTheme } from "@/theme";

function OrderBookLoading() {
  const { components } = useTheme();
  return (
    <LottieView
      speed={2}
      autoPlay
      loop
      source={require("@/theme/assets/images/fetching.json")}
      style={components.lottieIcon}
    />
  );
}

export default OrderBookLoading;
