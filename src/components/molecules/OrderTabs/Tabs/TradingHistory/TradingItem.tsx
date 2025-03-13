import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import CopyButton from "@/components/atoms/CopyButton";
import { useTheme } from "@/theme";
import { OrderAction, OrderType, Trading } from "@/types";
import { displayDate } from "@/utils/StringHelper";

interface TradingRowProps {
  title: string;
  value: string | number;
  enableCopy?: boolean;
}

const TradingRow = ({ title, value, enableCopy }: TradingRowProps) => {
  const { layout, fonts, gutters, components } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        gutters.marginTop_14,
        layout.itemsCenter,
      ]}>
      <Text style={[fonts.size_14, fonts.gray200]}>{title}</Text>
      <View style={[layout.row, layout.itemsCenter]}>
        <Text
          numberOfLines={1}
          style={[
            fonts.size_14,
            fonts.gray50,
            fonts.bold,
            gutters.marginRight_8,
            components.textMax120W,
          ]}>
          {value}
        </Text>
        {enableCopy && <CopyButton value={value} />}
      </View>
    </View>
  );
};

function TradingItem({ item }: { item: Trading }) {
  const { t } = useTranslation(["order", "common"]);
  const { layout, fonts, components, gutters } = useTheme();

  const fontActions =
    item.action === OrderAction.BUY ? fonts.green : fonts.red500;

  const tradeConfigDisplay: TradingRowProps[] = [
    { title: t("order:orderId"), value: item.orderId, enableCopy: true },
    {
      title: `${t("order:price")} (${item.quoteCurrency})`,
      value: item.matchingPrice,
    },
    {
      title: t("order:filledWithSymbol", {
        symbol: item.baseCurrency,
      }),
      value: item.quantity,
    },
    { title: t("order:role"), value: item.role },
    {
      title: t("order:feeWithSymbol", {
        symbol: item.baseCurrency,
      }),
      value: item.action === OrderAction.BUY ? item.feeInBase : item.feeInQuote,
    },
    {
      title: t("order:total", { symbol: item.quoteCurrency }),
      value: item.total,
    },
  ];

  const type =
    item.type === OrderType.LIMIT ? t("order:limit") : t("order:market");

  const action: string =
    OrderAction.BUY === item.action
      ? t("common:buy").toUpperCase()
      : t("common:sell").toUpperCase();

  return (
    <View style={[gutters.marginHorizontal_16, gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.justifyBetween]}>
        <View>
          <Text style={[fonts.size_20, fonts.gray50, fonts.bold]}>
            {item?.symbolName}
          </Text>
        </View>
        <View style={[layout.itemsCenter, layout.justifyCenter]}>
          <Text style={fonts.gray400}>{displayDate(item.createdAt)}</Text>
        </View>
      </View>
      <Text
        style={[fonts.size_12, fontActions, gutters.marginTop_4, fonts.bold]}>
        {`${type.toUpperCase()}/${action} `}
      </Text>
      <View style={gutters.marginBottom_16}>
        {tradeConfigDisplay.map((e) => (
          <TradingRow
            key={e.title + e.value.toString()}
            title={e.title}
            value={e.value}
            enableCopy={e.enableCopy}
          />
        ))}
      </View>

      <View style={[components.separator, gutters.marginTop_16]} />
    </View>
  );
}

export default TradingItem;
