import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import AggregationRow from "./AggregationRow";
import CustomBottomSheet, {
  BottomSheetRefProps,
} from "../../atoms/CustomBottomSheet";

import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { wait } from "@/utils/StringHelper";

interface ItemProps {
  item: number;
}

interface AggregationSelectionType {
  type?: "default" | "small" | "tiny";
  customStyle?: ViewStyle | ViewStyle[];
}

function AggregationSelection({ type, customStyle }: AggregationSelectionType) {
  const { layout, gutters, fonts, components, colors } = useTheme();
  const bsRef = useRef<BottomSheetRefProps>(null);
  const { t } = useTranslation(["common"]);
  const { currentAggregation, currentPair } = useStoreState(
    (store) => store.tradingPairModel,
  );
  const { setCurrentAggregation } = useStoreActions(
    (store) => store.tradingPairModel,
  );

  const aggregations = useMemo(() => {
    const tickSize = currentPair?.minBaseStep;
    if (!tickSize) return [];
    return [
      tickSize,
      tickSize * 10,
      tickSize * 100,
      tickSize * 1000,
      tickSize * 10000,
    ];
  }, [currentPair?.minBaseStep]);

  const isSmallType = type === "small";
  const isTinyType = type === "tiny";

  const renderItem = useCallback(
    (data: ItemProps) => {
      const { item } = data;
      return (
        <AggregationRow
          isSelected={item === currentAggregation}
          item={item}
          onPress={async () => {
            bsRef.current?.close();
            await wait(1);
            setCurrentAggregation(item);
          }}
        />
      );
    },
    [currentAggregation],
  );
  return (
    <View style={[customStyle]}>
      <TouchableOpacity
        style={[
          components.aggregationBox,
          isTinyType && components.aggregationBoxTiny,
        ]}
        onPress={() => {
          bsRef.current?.open();
        }}>
        <Text
          style={[
            isSmallType ? fonts.size_12 : fonts.size_14,
            isTinyType ? fonts.size_10 : fonts.size_14,
            fonts.gray800,
            fonts.bold,
          ]}>
          {currentAggregation}
        </Text>
        {/* <Image
          source={DownImage}
          style={[components.image12, { tintColor: colors.gray200 }]}
        /> */}
      </TouchableOpacity>
      <CustomBottomSheet ref={bsRef}>
        <View style={[layout.itemsCenter]}>
          <Text style={[fonts.size_16, fonts.gray50]}>
            {t("common:selectAggregation")}
          </Text>
          <View style={[components.separator, gutters.marginVertical_16]} />
          <FlatList
            data={aggregations}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, idx) => `${idx}`}
          />
        </View>
      </CustomBottomSheet>
    </View>
  );
}

export default AggregationSelection;
