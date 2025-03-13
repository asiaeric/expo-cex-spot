import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import PairRow from "./PairRow";
import CustomBottomSheet, {
  BottomSheetRefProps,
} from "../../atoms/CustomBottomSheet";

import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { TradingPair } from "@/types";

interface ItemProps {
  // eslint-disable-next-line react/no-unused-prop-types
  item: TradingPair;
}

interface Props {
  style?: ViewStyle | ViewStyle[];
}

function PairSelection({ style }: Props) {
  const { layout, gutters, fonts, components, colors } = useTheme();
  const bsRef = useRef<BottomSheetRefProps>(null);
  const { t } = useTranslation(["common"]);
  const { tradingPairs, currentPair } = useStoreState(
    (store) => store.tradingPairModel,
  );
  const { setCurrentPair } = useStoreActions((store) => store.tradingPairModel);
  const { resetCurrentTimeQuery } = useStoreActions(
    (store) => store.chartModel,
  );

  const renderItem = useCallback(
    ({ item }: ItemProps) => {
      return (
        <PairRow
          isSelected={currentPair?.id === item.id}
          item={item}
          onPress={() => {
            setCurrentPair(item);
            resetCurrentTimeQuery();
            bsRef.current?.close();
          }}
        />
      );
    },
    [currentPair],
  );

  return (
    <View style={[gutters.paddingVertical_12, style]}>
      <TouchableOpacity
        style={[layout.row, layout.itemsCenter]}
        onPress={() => {
          Keyboard.dismiss();
          bsRef.current?.open();
        }}>
        <Text style={[fonts.size_20, fonts.gray800, fonts.bold]}>
          {currentPair?.name || ""}
        </Text>
        {/* <Image
          source={DownImage}
          style={[
            components.image12,
            gutters.marginLeft_8,
            { tintColor: colors.gray200 },
          ]}
        /> */}
      </TouchableOpacity>
      <CustomBottomSheet ref={bsRef}>
        <View style={[layout.itemsCenter]}>
          <Text style={[fonts.size_16, fonts.gray50]}>
            {t("common:selectTradingPair")}
          </Text>
          <View style={[components.separator, gutters.marginVertical_16]} />
          <FlatList
            data={[...tradingPairs.values()]}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, idx) => `${idx}`}
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
}

export default PairSelection;
