import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import CustomBottomSheet, {
  BottomSheetRefProps,
} from "@/components/atoms/CustomBottomSheet";
import { useTheme } from "@/theme";

export type IncreaseBalanceBSRefProps = {
  open: () => void;
  close: () => void;
};

const IncreaseBalanceBS = forwardRef<IncreaseBalanceBSRefProps>(
  (props, ref) => {
    const { t } = useTranslation("order");
    const { layout, gutters, fonts, components } = useTheme();
    const bsRef = useRef<BottomSheetRefProps>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        bsRef.current?.open();
      },
      close: () => {
        bsRef.current?.close();
      },
    }));
    return (
      <View style={[gutters.marginTop_12]}>
        <CustomBottomSheet ref={bsRef}>
          <View style={[layout.itemsCenter]}>
            <Text style={[fonts.size_16, fonts.gray50]}>
              {t("increaseBalance")}
            </Text>
            <View style={[components.separator, gutters.marginVertical_16]} />
            <Text style={fonts.gray200}>{t("insufficientBalance")}</Text>
          </View>
        </CustomBottomSheet>
      </View>
    );
  },
);

export default IncreaseBalanceBS;
