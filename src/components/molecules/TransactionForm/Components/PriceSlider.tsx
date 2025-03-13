import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Slider, AwesomeSliderRef } from "react-native-awesome-slider";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useTheme } from "@/theme";

const MIN_VALUE = 0;
const MAX_VALUE = 100;

interface MarkProps {
  index: number;
  progress: SharedValue<number>;
}

const Mark = ({ index, progress }: MarkProps) => {
  const { colors } = useTheme();
  const rMarkStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        progress.value >= index * 25 ? colors.green : colors.background900,
      borderColor: colors.gray200,
      borderWidth: progress.value >= index * 25 ? 0 : 1.5,
    };
  });

  return <Animated.View key={index} style={[styles.markStyle, rMarkStyle]} />;
};

export interface PriceSliderProps {
  onChange: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface PriceSliderRef {
  resetSlider: () => void;
}

const PriceSlider = forwardRef<PriceSliderRef, PriceSliderProps>(
  ({ onChange, containerStyle }, ref) => {
    const { colors, layout, gutters } = useTheme();
    const progress = useSharedValue(MIN_VALUE);
    const isScrubbing = useRef(false);
    const min = useSharedValue(MIN_VALUE);
    const max = useSharedValue(MAX_VALUE);
    const thumbScaleValue = useSharedValue(1);
    const cache = useSharedValue(MIN_VALUE);

    const slideRef = useRef<AwesomeSliderRef>(null);

    useAnimatedReaction(
      () => progress.value,
      (current, previous) => {
        if (current !== previous) {
          onChange?.(current);
        }
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({
      resetSlider: () => {
        slideRef.current?.reset();
      },
    }));

    const onSlidingStart = () => {
      isScrubbing.current = true;
    };

    const renderMark = useCallback(
      // eslint-disable-next-line react/no-unused-prop-types
      ({ index }: { index: number }) => (
        <Mark index={index} progress={progress} />
      ),
      [],
    );

    return (
      <View style={{ position: "relative" }}>
        <View
          style={[
            layout.z10,
            gutters.marginTop_24,
            gutters.marginHorizontal_4,
            containerStyle,
          ]}>
          <Slider
            ref={slideRef}
            theme={{
              maximumTrackTintColor: colors.gray200,
              minimumTrackTintColor: colors.green,
              bubbleBackgroundColor: "#666",
            }}
            progress={progress}
            onSlidingStart={onSlidingStart}
            onValueChange={(e) => {
              progress.value = e;
            }}
            minimumValue={min}
            maximumValue={max}
            cache={cache}
            thumbScaleValue={thumbScaleValue}
            step={100}
            thumbWidth={18}
            markWidth={4}
            sliderHeight={1}
            snapToStep
            renderMark={renderMark}
          />
        </View>
      </View>
    );
  },
);

export default memo(PriceSlider);

const styles = StyleSheet.create({
  markStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
