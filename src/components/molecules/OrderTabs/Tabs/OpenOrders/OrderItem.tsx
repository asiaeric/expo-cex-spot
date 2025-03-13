import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { CustomButton } from "@/components/atoms";
import ProgressBar from "@/components/atoms/ProgressBar";
import { useTheme } from "@/theme";
import { Order, OrderAction, OrderType } from "@/types";
import { displayDate, formatCurrency } from "@/utils/StringHelper";

function OrderItem({
  item,
  onCancel,
}: // onEdit,
{
  item: Order;
  onCancel: (id: number) => void;
  // onEdit?: (item: Order) => void
}) {
  const { t } = useTranslation(["order", "common"]);
  const { layout, fonts, components, gutters, backgrounds } = useTheme();

  const percent = (item.filled * 100) / item.quantity;

  const type =
    item.type === OrderType.LIMIT ? t("order:limit") : t("order:market");

  const action: string =
    OrderAction.BUY === item.action
      ? t("common:buy").toUpperCase()
      : t("common:sell").toUpperCase();

  const backgroundAction =
    item.action === OrderAction.BUY ? backgrounds.green : backgrounds.red500;
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
        <View style={[layout.row, layout.itemsCenter, layout.justifyCenter]}>
          <View style={[layout.itemsCenter, gutters.marginRight_8]}>
            <Text
              style={[fonts.gray400, gutters.marginBottom_4, fonts.size_12]}>
              {percent.toFixed(2)}%
            </Text>
            <ProgressBar
              progress={percent}
              width={42}
              background={backgroundAction}
            />
          </View>
          <CustomButton
            type="square"
            onPress={() => onCancel(item.externalId || item.id)}
            text={t("common:cancel")}
          />
          {/* <CustomButton
						type="square"
						onPress={() => onEdit(item)}
						text="Edit"
					/> */}
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
          {item.type === OrderType.LIMIT ? (
            <Text style={[fonts.size_16, fonts.gray50, fonts.bold]}>
              {`${item.filled} / `}
              <Text style={[fonts.size_16, fonts.gray400, fonts.bold]}>
                {item.quantity}
              </Text>
            </Text>
          ) : (
            <Text style={[fonts.size_16, fonts.gray50, fonts.bold]}>
              {type}
            </Text>
          )}
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

export default OrderItem;
