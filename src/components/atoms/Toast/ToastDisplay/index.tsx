import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import CancelToastIcon from "./CancelToastIcon";
import InfoToastIcon from "./InfoToastIcon";
import SuccessToastIcon from "./SuccessToastIcon";

import { useTheme } from "@/theme";
import { Order, OrderAction, OrderType } from "@/types";

// const toastColors = {
// 	normal: ['#BA55D3', '#8A2BE2'],
// 	success: ['#32BB71', '#2A9D8F'],
// 	warning: ['#F8B806', '#FF8C04'],
// 	danger: ['#F6743E', '#D42525'],
// }

const colorToastBackground = {
  normal: "#475C7A",
  success: "#162F46",
  warning: "#F6FFF990",
  danger: "#3C3C55",
};

const colorToastBorder = {
  normal: "#9DC0EE",
  success: "#48C1B5",
  warning: "#F7D9A4",
  danger: "#F4B0A1",
};

interface ToastProps {
  message: Order;
  type: "success" | "info" | "danger" | "reject";
}

function ToastDisplay(props: ToastProps) {
  const { t } = useTranslation(["order", "common"]);
  const { gutters, layout, borders, fonts } = useTheme();
  const { message: order, type } = props;

  const FallbackUI = <View />;

  if (!type) {
    return FallbackUI;
  }

  const background =
    colorToastBackground[type as keyof typeof colorToastBackground] ||
    colorToastBackground.normal;

  const borderColor =
    colorToastBorder[type as keyof typeof colorToastBorder] ||
    colorToastBorder.normal;

  const orderType =
    order.type === OrderType.LIMIT ? t("order:limit") : t("order:market");

  const orderAction: string =
    OrderAction.BUY === order.action
      ? t("common:buy").toUpperCase()
      : t("common:sell").toUpperCase();

  const IconComponent =
    {
      success: SuccessToastIcon,
      info: InfoToastIcon,
      danger: CancelToastIcon,
      reject: CancelToastIcon,
    }[type] || InfoToastIcon;

  const ContentComponent =
    {
      success: (
        <Text style={[fonts.size_14, fonts.gray50]}>
          {t("order:orderSubmittedSuccessfully")}
        </Text>
      ),
      info: (
        <Text style={[fonts.size_14, fonts.gray50]}>
          {`${orderType}: `}
          <Text
            style={[
              order.action === OrderAction.BUY ? fonts.green : fonts.red500,
              fonts.bold,
            ]}>
            {orderAction}
          </Text>
          {` ${order.filled} ${order.baseCurrency} at ${order.priceFromUser} ${order.quoteCurrency}`}
        </Text>
      ),
      danger: (
        <Text style={[fonts.size_14, fonts.gray50]}>
          {t("order:orderCancelled")}
        </Text>
      ),
      reject: (
        <Text style={[fonts.size_14, fonts.gray50]}>
          {t("order:orderRejected")}
        </Text>
      ),
    }[type] || FallbackUI;

  return (
    <View
      style={[
        layout.row,
        gutters.padding_16,
        borders.rounded_20,
        gutters.marginTop_20,
        borders.w_1,
        { backgroundColor: background },
        {
          borderColor,
        },
      ]}>
      <IconComponent />
      <View style={[layout.flex_1, gutters.marginLeft_16]}>
        <Text
          style={[
            fonts.size_16,
            fonts.bold,
            fonts.gray50,
            gutters.marginBottom_4,
          ]}>
          {order.symbolCode}
        </Text>
        {ContentComponent}
      </View>
    </View>
  );
}

export default ToastDisplay;
