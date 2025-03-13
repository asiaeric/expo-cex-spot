import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import {
  CustomBottomSheet,
  CustomButton,
  CustomTextInput,
} from "@/components/atoms";
import { BottomSheetRefProps } from "@/components/atoms/CustomBottomSheet";
import { useStoreActions } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { Order } from "@/types";

export type ModifyPopUpRefProps = {
  open: () => void;
  close: () => void;
  currentOrder: (item: Order) => void;
};

const ModifyPopUp = forwardRef<ModifyPopUpRefProps>((props, ref) => {
  const { layout, gutters, fonts, components } = useTheme();
  const { t } = useTranslation(["common"]);
  const [order, setOrder] = useState<Order | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const bottomRef = useRef<BottomSheetRefProps>(null);
  const { updateOpenOrder } = useStoreActions((store) => store.openOrdersModal);

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomRef.current?.open();
    },
    close: () => {
      bottomRef.current?.close();
    },
    currentOrder: (item: Order) => {
      setOrder(item);
      setCurrentPrice(item.priceFromUser);
      setQuantity(item.quantity);
    },
  }));

  return (
    <View>
      <CustomBottomSheet ref={bottomRef}>
        <View style={[layout.itemsCenter]}>
          <Text style={[fonts.size_16, fonts.gray50]}>
            {t("common:adjustOrder")}
          </Text>
          <View style={[components.separator, gutters.marginVertical_16]} />
        </View>
        <View style={[gutters.marginHorizontal_14, gutters.marginBottom_14]}>
          <CustomTextInput
            title="Amount"
            onChangeText={(text) => {
              setQuantity(Number(text));
            }}
            value={quantity.toString()}
            placeholder="0 ETH"
            keyboardType="numeric"
            type="small"
          />
          <CustomTextInput
            title="Price"
            onChangeText={(text) => {
              setCurrentPrice(Number(text));
            }}
            value={currentPrice.toString()}
            placeholder="0 VIC"
            keyboardType="numeric"
            type="small"
          />
          <CustomButton
            text={t("common:confirm")}
            type="regular"
            onPress={() => {
              if (order) {
                updateOpenOrder({
                  ...order,
                  priceFromUser: currentPrice,
                  quantity,
                });
                bottomRef.current?.close();
              }
            }}
            textStyle={fonts.gray50}
            customStyle={[gutters.marginTop_20]}
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
});

export default ModifyPopUp;
