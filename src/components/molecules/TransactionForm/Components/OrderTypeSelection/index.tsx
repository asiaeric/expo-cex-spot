import { t } from "i18next";
import { ChevronDown, InfoIcon } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

import OrderTypeRow from "./OrderTypeRow";

import CustomBottomSheet, {
  BottomSheetRefProps,
} from "@/components/atoms/CustomBottomSheet";
import { PLACE_ORDER_TYPES } from "@/constants";
import { useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { OrderType, PlaceOrderDTO } from "@/types";
import { moderateScale } from "@/types/theme/responsive";

interface ItemProps {
  // eslint-disable-next-line react/no-unused-prop-types
  item: PlaceOrderDTO;
}

function OrderTypeSelection({
  value,
  onSelect,
}: {
  value: PlaceOrderDTO;
  onSelect: (e: PlaceOrderDTO) => void;
}) {
  const { layout, gutters, fonts, components, backgrounds, borders } =
    useTheme();
  const bsRef = useRef<BottomSheetRefProps>(null);
  const tooltipRef = useRef<BottomSheetRefProps>(null);
  const { placeOrderTypes } = useStoreState((store) => store.openOrdersModal);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagerViewRef = useRef(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    pagerViewRef.current?.setPage(pageNumber);
  };

  const renderItem = useCallback(
    ({ item }: ItemProps) => {
      return (
        <OrderTypeRow
          isSelected={value?.code === item.code}
          item={item}
          onPress={() => {
            onSelect(item);
            bsRef.current?.close();
            // handlePageChange(item.id)
            // pagerViewRef.current?.setPage(item.id)
          }}
        />
      );
    },
    [value],
  );
  return (
    <View style={[gutters.marginTop_12]}>
      <Pressable
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          gutters.paddingHorizontal_10,
          backgrounds.neutral500,
          borders.rounded_8,
          styles.selection,
        ]}
        onPress={() => {
          Keyboard.dismiss();
          bsRef.current?.open();
        }}>
        <Pressable onPress={() => tooltipRef.current?.open()}>
          <InfoIcon color="white" size={18} />
        </Pressable>
        <View>
          <Text style={[fonts.size_14, fonts.gray800, fonts.bold]}>
            {value.code === OrderType.LIMIT
              ? t("order:limit")
              : t("order:market")}
          </Text>
        </View>
        <ChevronDown color="white" size={18} />
      </Pressable>

      <CustomBottomSheet ref={bsRef}>
        <View style={[layout.itemsCenter]}>
          <Text style={[fonts.size_16, fonts.gray50]}>
            {t("common:selectOrderType")}
          </Text>
          <View style={[components.separator, gutters.marginVertical_16]} />
          <FlatList
            data={placeOrderTypes}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, idx) => `${idx}`}
          />
        </View>
      </CustomBottomSheet>
      <CustomBottomSheet ref={tooltipRef} onDismiss={() => handlePageChange(0)}>
        <View style={[layout.row]}>
          {PLACE_ORDER_TYPES.map((item, index) => {
            return (
              <Pressable
                onPress={() => handlePageChange(index)}
                key={index}
                style={[layout.flex_1, layout.itemsCenter]}>
                <Text
                  style={[
                    fonts.capitalize,
                    fonts.size_12,
                    fonts.gray50,
                    index === currentPage ? fonts.infoClaimText : fonts.gray50,
                  ]}>
                  {t(item.title)}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <PagerView
          useNext
          ref={pagerViewRef}
          initialPage={currentPage}
          onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
          scrollEnabled>
          {PLACE_ORDER_TYPES.map((item, index) => (
            <View key={index} style={components.tooltipBs}>
              <Text style={[fonts.size_12, fonts.gray50]}>
                {t(item.description)}
              </Text>
            </View>
          ))}
        </PagerView>
      </CustomBottomSheet>
    </View>
  );
}

export default OrderTypeSelection;

const styles = StyleSheet.create({
  selection: {
    height: moderateScale(36),
  },
  image: {
    position: "absolute",
    right: moderateScale(12),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pagerView: {
    flex: 1,
    width: "100%",
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  pageIndicator: {
    flexDirection: "row",
    marginVertical: 16,
  },
  pageIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activePageIndicatorDot: {
    backgroundColor: "#000",
  },
});
