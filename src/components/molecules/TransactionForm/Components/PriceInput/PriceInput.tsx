import { createIntl, createIntlCache } from "@formatjs/intl";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import useValue from "./useValue";

import { ToolTipPopUp } from "@/components/atoms";
import { useTheme } from "@/theme";
import { adjustValueToSize } from "@/utils/OrderHelpers";
import { replaceLastComma } from "@/utils/StringHelper";

const cache = createIntlCache();
const intl = createIntl(
  {
    locale: "en-US",
    messages: {},
  },
  cache,
);

function formatNumber(value: number, size: number) {
  const fixedValue = adjustValueToSize(value, size);
  const [numberPart, decimalPart] = fixedValue.toString().split(".");
  const formattedNumber = intl.formatNumber(Number(numberPart));
  return formattedNumber === "NaN"
    ? ""
    : `${formattedNumber}${
        decimalPart || decimalPart === "0" ? `.${decimalPart}` : ""
      }`;
}

function isFormattedPartially(value: string) {
  return value.endsWith(".") || value === "-";
}

function getUnformattedValue(value: string) {
  return parseFloat(value.replace(/,/g, ""));
}

type InputTextProps = {
  placeholder?: string;
  textInputProps?: TextInputProps;
  labelTopValue?: number;
  borderColor?: string;
  borderWidth?: number;
  paddingVertical?: number;
  borderRadius?: number;
  value: number;
  onChange: (value: number) => void;
  customStyle?: ViewStyle;
  disabled?: boolean;
  hasChangeAction?: boolean;
  size?: number;
  minValue?: number;
  maxValue?: number;
  error?: string;
  onBlur?: () => void;
  showTooltip?: boolean;
};

const PriceInput = forwardRef<TextInput, InputTextProps>((props, ref) => {
  const { fonts, colors, components, borders, gutters, layout, backgrounds } =
    useTheme();
  const labelSharedValue = useSharedValue(0);
  const {
    textInputProps,
    labelTopValue = -12,
    borderColor = "gray",
    borderWidth = 1,
    paddingVertical = 8,
    borderRadius = 5,
    placeholder = "",
    value = 0,
    onChange,
    customStyle,
    disabled = false,
    hasChangeAction = true,
    size = 1,
    minValue = -999999999999999,
    maxValue = 999999999999999,
    error,
    onBlur,
    showTooltip = true,
  } = props;

  useEffect(() => {
    const isFocused = ref?.current?.isFocused();
    labelSharedValue.value = isFocused || value || value === 0 ? 1 : 0;
  }, [value]);

  const isValid = useCallback(
    (newValue: number) => {
      if (
        (minValue !== undefined && newValue < minValue) ||
        (maxValue !== undefined && newValue > maxValue)
      ) {
        return false;
      }
      return true;
    },
    [minValue, maxValue],
  );

  const { formattedValue, onChangeValue } = useValue<number, string>({
    onChange,
    value,
    size,
    getFormattedValue: formatNumber,
    isFormattedPartially,
    isValid,
    getUnformattedValue,
  });

  const onChangeText = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeValue(replaceLastComma(e.nativeEvent.text));
    },
    [onChangeValue],
  );

  const onIncrease = () => {
    const sum = parseFloat(((value || 0) + size).toFixed(10));
    onChange(adjustValueToSize(sum, size));
  };

  const onDecrease = () => {
    const des = parseFloat((value - size).toFixed(10));
    onChange(adjustValueToSize(des, size));
  };

  const animatedLabelProps = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(
        interpolate(labelSharedValue.value, [0, 1], [14, 10]),
      ),
      top: withTiming(
        interpolate(labelSharedValue.value, [0, 1], [0, labelTopValue]),
      ),
    };
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInput: {
          paddingVertical,
          justifyContent: "center",
          borderWidth,
          borderRadius,
          borderColor,
        },
        textInputStyle: {
          color: colors.gray50,
          fontSize: 14,
          paddingHorizontal: 12,
          paddingTop: 12,
          textAlignVertical: "center",
          zIndex: 100,
          flex: 1,
        },
        textInputLabelWrapper: {
          position: "absolute",
          zIndex: 10,
          bottom: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [borderColor, borderRadius, borderWidth, paddingVertical],
  );

  const labelHandler = () => {
    labelSharedValue.value = 1;
    ref?.current?.focus();
  };

  return (
    <View style={layout.itemsCenter}>
      <ToolTipPopUp message={error} showTooltip={showTooltip} />
      <View
        style={[
          layout.row,
          components.textInput,
          borders.rounded_8,
          gutters.marginTop_12,
          disabled && backgrounds.modal,
          customStyle,
          !!error && components.errorBox,
        ]}>
        {hasChangeAction && (
          <TouchableOpacity
            onPress={onDecrease}
            hitSlop={8}
            disabled={value - size < 0}>
            {/* <Image
              source={MinusImage}
              style={[{ tintColor: colors.gray400 }, components.image12]}
            /> */}
          </TouchableOpacity>
        )}
        <TextInput
          editable={!disabled}
          {...textInputProps}
          ref={ref}
          textAlign="center"
          keyboardType="decimal-pad"
          onFocus={() => {
            labelSharedValue.value = 1;
          }}
          onBlur={() => {
            if (value === 0) {
              labelSharedValue.value = 1;
            } else if (!value) {
              labelSharedValue.value = 0;
            }
            onBlur?.();
          }}
          value={formattedValue}
          onChange={onChangeText}
          style={[styles.textInputStyle]}
        />
        {hasChangeAction && (
          <TouchableOpacity onPress={onIncrease} hitSlop={8}>
            {/* <Image
              source={PlusImage}
              style={[{ tintColor: colors.gray400 }, components.image12]}
            /> */}
          </TouchableOpacity>
        )}

        <Animated.View style={styles.textInputLabelWrapper}>
          <Pressable onPress={labelHandler} disabled={disabled}>
            <Animated.Text style={[fonts.gray400, animatedLabelProps]}>
              {placeholder}
            </Animated.Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
});

export default PriceInput;
