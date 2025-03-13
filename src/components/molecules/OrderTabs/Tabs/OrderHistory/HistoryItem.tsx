import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useTheme } from "@/theme";
import { FetchOrderStatus, Order, OrderAction, OrderType } from "@/types";
import { generateNameStatus } from "@/utils/OrderHelpers";
import { displayDate, formatCurrency } from "@/utils/StringHelper";

function HistoryItem({ item }: { item: Order }) {
  const { t } = useTranslation(["order", "common"]);
  const { layout, fonts, components, gutters, backgrounds } = useTheme();

  const type =
    item.type === OrderType.LIMIT ? t("order:limit") : t("order:market");

  const action: string =
    OrderAction.BUY === item.action
      ? t("common:buy").toUpperCase()
      : t("common:sell").toUpperCase();

  const backgroundStatus =
    item.status === FetchOrderStatus.COMPLETED
      ? backgrounds.green
      : backgrounds.red500;

  const fontActions =
    item.action === OrderAction.BUY ? fonts.green : fonts.red500;

  return (
    <View style={[gutters.marginHorizontal_16, gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <View style={layout.flex_1}>
          <Text
            style={[fonts.size_14, fonts.gray200, gutters.marginBottom_12]}
            numberOfLines={1}>
            {t("order:orderId")}
            {`: ${item?.id}`}
          </Text>
          <Text style={[fonts.size_20, fonts.gray50, fonts.bold]}>
            {item?.symbolName}
          </Text>
          <Text
            style={[
              fonts.size_12,
              fontActions,
              gutters.marginTop_8,
              fonts.bold,
            ]}>
            {`${type.toUpperCase()}/${action} `}
            <Text style={fonts.gray400}>{displayDate(item.createdAt)}</Text>
          </Text>
        </View>
        <View style={[layout.itemsCenter, layout.justifyCenter]}>
          <View
            style={[
              components.badge,
              gutters.marginBottom_16,
              backgroundStatus,
            ]}>
            <Text
              style={[
                fonts.size_12,
                fonts.gray50,
                fonts.capitalize,
                fonts.bold,
              ]}>
              {generateNameStatus(item.status)}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          gutters.marginTop_14,
          layout.itemsCenter,
        ]}>
        <Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
          {t("order:filled")} / {t("order:amount")}
        </Text>
        <View>
          <Text style={[fonts.size_16, fonts.gray50, fonts.bold]}>
            {`${item.filled} / `}
            <Text style={[fonts.size_16, fonts.gray400, fonts.bold]}>
              {item.type === OrderType.LIMIT ? item.quantity : item.filled}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          gutters.marginTop_14,
          layout.itemsCenter,
        ]}>
        <Text style={[fonts.size_16, fonts.gray200, fonts.bold]}>
          {t("order:price")}
        </Text>
        <View>
          <Text style={[fonts.size_16, fonts.gray50, fonts.bold]}>
            {formatCurrency(item.priceFromUser)} {item.quoteCurrency}
          </Text>
        </View>
      </View>
      <View style={[components.separator, gutters.marginTop_16]} />
    </View>
  );
}

export default HistoryItem;
