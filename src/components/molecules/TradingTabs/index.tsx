import { t } from "i18next";
import React, { useRef } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

import MarketTrade from "../MarketTrade";
import OrderBook from "../OrderBook";

import { useTheme } from "@/theme";

const { width } = Dimensions.get("window");

interface TabBarButtonProps {
  tab: string;
  scrollX: SharedValue<number>;
  onTabPress: (index: number) => void;
  index: number;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  tab,
  scrollX,
  onTabPress,
  index,
}) => {
  const { layout, gutters, fonts, borders } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      "#00000000",
      "#48484a",
      "#00000000",
    ]);
    const scale = withTiming(scrollX.value === width * index ? 1.1 : 1, {
      duration: 100,
    });
    const opacity = withTiming(scrollX.value === width * index ? 1 : 0.7, {
      duration: 300,
    });

    return {
      backgroundColor,
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        layout.itemsCenter,
        layout.justifyCenter,
        gutters.padding_12,
        borders.rounded_8,
        gutters.marginLeft_16,
        animatedStyle,
      ]}>
      <TouchableOpacity onPress={() => onTabPress(index)}>
        <Text style={[fonts.size_14, fonts.bold, fonts.gray800]}>{tab}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Tabs: React.FC = () => {
  const { layout, gutters } = useTheme();
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const tabs = [t("order:orderBook"), t("order:trades")];
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onTabPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: width * index,
      animated: true,
    });
  };

  return (
    <View style={[layout.flex_1, gutters.marginTop_16]}>
      <View style={layout.row}>
        {tabs.map((tab, index) => (
          <TabBarButton
            key={index}
            index={index}
            tab={tab}
            scrollX={scrollX}
            onTabPress={onTabPress}
          />
        ))}
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        scrollEnabled>
        <View style={{ width }}>
          <OrderBook />
        </View>
        <View style={{ width }}>
          <MarketTrade />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Tabs;
