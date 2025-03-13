import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

import { useTheme } from "@/theme";

export enum OrderBookFilterType {
  ALL = "ALL",
  BID = "BID",
  ASK = "ASK",
}

interface OrderBookFilterProps {
  type: OrderBookFilterType;
  onChange: (filter: OrderBookFilterType) => void;
}

function OrderBookFilter({
  type = OrderBookFilterType.ALL,
  onChange,
}: OrderBookFilterProps) {
  const { colors } = useTheme();

  const isSingle = type !== OrderBookFilterType.ALL;
  const typeColor =
    type === OrderBookFilterType.ASK ? colors.red500 : colors.green;

  const handlePress = () => {
    switch (type) {
      case OrderBookFilterType.ALL:
        onChange(OrderBookFilterType.ASK);
        break;
      case OrderBookFilterType.ASK:
        onChange(OrderBookFilterType.BID);
        break;
      case OrderBookFilterType.BID:
        onChange(OrderBookFilterType.ALL);
        break;
      default:
        onChange(OrderBookFilterType.ALL);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1} hitSlop={8}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        {isSingle ? (
          <Path d="M4 4h6.999v16H4z" fill={typeColor} />
        ) : (
          <>
            <Path d="M4.001 4.001H11v7.001H4.001z" fill={colors.red500} />
            <Path d="M4.001 13.001H11v7.001H4.001z" fill={colors.green} />
          </>
        )}

        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.001 4.001H20v4.001h-6.999zm0 6H20v4.001h-6.999zm6.999 6h-6.999v4.001H20z"
          fill={colors.gray200}
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default OrderBookFilter;
