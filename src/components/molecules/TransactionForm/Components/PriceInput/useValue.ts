import { useCallback, useEffect, useRef, useState } from "react";

import { getDecimalPlaces } from "@/utils/OrderHelpers";

interface UseValueProps<ValueType, FormattedType = ValueType> {
  value?: ValueType;
  onChange?: (value: ValueType) => void;
  size: number;
  getFormattedValue?: (value: ValueType, size: number) => FormattedType;
  getUnformattedValue?: (value: FormattedType) => ValueType;
  isValid?: (value: ValueType) => boolean;
  isFormattedPartially?: (value: FormattedType) => boolean;
}

function useValue<ValueType, FormattedType = ValueType>({
  value,
  onChange,
  size,
  getFormattedValue = (e: ValueType) => e as unknown as FormattedType,
  getUnformattedValue = (e: FormattedType) => e as unknown as ValueType,
  isValid = () => true,
  isFormattedPartially = () => false,
}: UseValueProps<ValueType, FormattedType>) {
  const localValueRef = useRef<ValueType | undefined>(value);

  const [formattedValue, setFormattedValue] = useState<
    FormattedType | undefined
  >(() => {
    if (value !== undefined) {
      return getFormattedValue(value, size);
    }
    return undefined;
  });

  const onChangeValue = useCallback(
    (newValue: FormattedType) => {
      const newUnformattedValue = getUnformattedValue(newValue);

      localValueRef.current = newUnformattedValue;

      if (isFormattedPartially(newValue)) {
        setFormattedValue(newValue);
        return;
      }

      if (typeof newValue === "string" && newValue.includes(".")) {
        const decimalPlaces = getDecimalPlaces(size);
        const [, decimalPart] = newValue.split(".");
        const isTrailingWithZero = decimalPart
          .split("")
          .every((digit) => digit === "0");

        if (decimalPlaces < decimalPart.length) {
          return;
        }

        if (isTrailingWithZero) {
          const formatted = getFormattedValue(newUnformattedValue, size);
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          setFormattedValue(`${formatted}.${decimalPart}` as FormattedType);
          return;
        }
      }
      if (!isValid(newUnformattedValue)) {
        return;
      }
      const formatted = getFormattedValue(newUnformattedValue, size);

      localValueRef.current = newUnformattedValue;

      if (onChange) {
        onChange(newUnformattedValue);
      }

      setFormattedValue(formatted);
    },
    [
      onChange,
      getFormattedValue,
      getUnformattedValue,
      isValid,
      isFormattedPartially,
    ],
  );

  useEffect(() => {
    if (value !== localValueRef.current) {
      setFormattedValue(
        value !== undefined ? getFormattedValue(value, size) : undefined,
      );
      localValueRef.current = value;
    }
  }, [value, getFormattedValue]);

  return { formattedValue, onChangeValue };
}

export default useValue;
