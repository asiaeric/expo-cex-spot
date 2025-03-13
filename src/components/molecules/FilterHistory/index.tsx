import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { t } from "i18next";
import { useRef, useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import CustomBottomSheet, {
  BottomSheetRefProps,
} from "../../atoms/CustomBottomSheet";

import { CustomButton } from "@/components/atoms";
import FilterSvg from "@/components/svg/FilterSvg";
import { initialFilter } from "@/constants";
import { useTheme } from "@/theme";
import i18n from "@/translations";
import { FilterDate } from "@/types";

interface AggregationSelectionType {
  customStyle?: ViewStyle | ViewStyle[];
  onFilterChange: ({ startDate, endDate }: FilterDate) => void;
  filters: FilterDate;
}

enum DateType {
  START = "start",
  END = "end",
}

enum DateRange {
  OneDay = "1 Day",
  OneWeek = "1 Week",
  OneMonth = "1 Month",
  ThreeMonths = "3 Months",
}

const DATE_FORMAT = "DD/MM/YYYY";

function FilterHistory({
  filters,
  customStyle,
  onFilterChange,
}: AggregationSelectionType) {
  const { layout, gutters, fonts, backgrounds, borders } = useTheme();
  const bsRef = useRef<BottomSheetRefProps>(null);

  const displayRange = {
    [DateRange.OneDay]: t("common:OneDay"),
    [DateRange.OneWeek]: t("common:OneWeek"),
    [DateRange.OneMonth]: t("common:OneMonth"),
    [DateRange.ThreeMonths]: t("common:ThreeMonths"),
  };

  const [startDate, setStartDate] = useState(
    filters.startDate
      ? new Date(filters.startDate)
      : new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [endDate, setEndDate] = useState(
    filters.endDate ? new Date(filters.endDate) : new Date(),
  );

  const [dateToUpdate, setDateToUpdate] = useState(DateType.START);

  const handleDateChange = (_: any, date?: Date) => {
    if (dateToUpdate === DateType.START) {
      const startDateValue = new Date(date!);
      startDateValue.setHours(0, 0, 0, 0);
      setStartDate(startDateValue);
    } else {
      const endDateValue = new Date(date!);
      endDateValue.setHours(23, 59, 59, 999);
      setEndDate(endDateValue);
    }
  };

  const setDateRange = (range: DateRange) => {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case DateRange.OneDay:
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case DateRange.OneWeek:
        start.setDate(end.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case DateRange.OneMonth:
        start.setMonth(end.getMonth() - 1, end.getDate());
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case DateRange.ThreeMonths:
        start.setMonth(end.getMonth() - 3, end.getDate());
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      default:
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
    }
    setDateToUpdate(DateType.START);
    setStartDate(start);
    setEndDate(end);
  };

  const resetFilters = () => {
    const now = new Date();
    setStartDate(now);
    setEndDate(now);
    onFilterChange(initialFilter);
    bsRef.current?.close();
  };

  const onConfirmPress = () => {
    bsRef.current?.close();

    onFilterChange({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  return (
    <View style={[customStyle]}>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          backgrounds.background900,
          gutters.paddingHorizontal_12,
          gutters.paddingVertical_20,
        ]}>
        <View style={[layout.row, layout.itemsCenter]}>
          {filters?.startDate && (
            <TouchableOpacity
              onPress={() => {
                setDateToUpdate(DateType.START);
                bsRef.current?.open();
              }}
              style={[
                gutters.padding_8,
                borders.gray400,
                borders.w_1,
                borders.rounded_8,
                layout.itemsCenter,
              ]}>
              <Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
                {dayjs(filters?.startDate).format(DATE_FORMAT)}
              </Text>
            </TouchableOpacity>
          )}

          {filters?.endDate && (
            <>
              <Text
                style={[
                  fonts.size_14,
                  fonts.gray200,
                  fonts.bold,
                  gutters.marginHorizontal_8,
                ]}>
                -
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setDateToUpdate(DateType.END);
                  bsRef.current?.open();
                }}
                style={[
                  gutters.padding_8,
                  borders.gray400,
                  borders.w_1,
                  borders.rounded_8,
                  layout.itemsCenter,
                  backgrounds.purple100,
                ]}>
                <Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
                  {dayjs(filters?.endDate).format(DATE_FORMAT)}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            bsRef.current?.open();
          }}>
          <FilterSvg />
        </TouchableOpacity>
      </View>
      <CustomBottomSheet ref={bsRef}>
        <View style={[gutters.marginHorizontal_16]}>
          <Text
            style={[fonts.size_24, fonts.gray50, gutters.marginVertical_16]}>
            {t("common:filters")}
          </Text>
          <Text style={[fonts.size_16, layout.selfLeft, fonts.gray400]}>
            {t("common:dates")}
          </Text>
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              gutters.marginVertical_16,
              layout.fullWidth,
            ]}>
            {Object.values(DateRange).map((range, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setDateRange(range)}
                style={[
                  gutters.padding_16,
                  borders.gray400,
                  borders.w_1,
                  borders.rounded_8,
                ]}>
                <Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
                  {displayRange[range]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <View
              style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
              <TouchableOpacity
                onPress={() => setDateToUpdate(DateType.START)}
                style={[
                  gutters.padding_16,
                  borders.gray400,
                  borders.w_1,
                  borders.rounded_8,
                  layout.flex_1,
                  layout.itemsCenter,
                  dateToUpdate === DateType.START && backgrounds.purple100,
                ]}>
                <Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
                  {dayjs(startDate).format(DATE_FORMAT)}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  fonts.gray400,
                  fonts.size_16,
                  gutters.marginHorizontal_16,
                ]}>
                to
              </Text>
              <TouchableOpacity
                onPress={() => setDateToUpdate(DateType.END)}
                style={[
                  gutters.padding_16,
                  borders.gray400,
                  borders.w_1,
                  borders.rounded_8,
                  layout.flex_1,
                  layout.itemsCenter,
                  dateToUpdate === DateType.END && backgrounds.purple100,
                ]}>
                <Text style={[fonts.size_14, fonts.gray200, fonts.bold]}>
                  {dayjs(endDate).format(DATE_FORMAT)}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={dateToUpdate === DateType.START ? startDate : endDate}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              maximumDate={
                dateToUpdate === DateType.START ? endDate : new Date()
              }
              minimumDate={
                dateToUpdate === DateType.END
                  ? startDate
                  : new Date(new Date().setDate(new Date().getDate() - 179))
              }
              locale={i18n.language === "vn" ? "vi-VN" : undefined}
              onChange={handleDateChange}
            />
          </View>
          <Text style={[fonts.gray400, fonts.alignCenter]}>
            {t("common:filterDescription")}
          </Text>
          <View
            style={[layout.row, layout.justifyAround, gutters.marginTop_40]}>
            <View style={layout.flex_1}>
              <CustomButton
                onPress={resetFilters}
                text={t("common:reset")}
                customStyle={[borders.w_1, borders.gray400]}
              />
            </View>
            <View style={[layout.flex_1, gutters.marginLeft_16]}>
              <CustomButton
                onPress={onConfirmPress}
                text={t("common:confirm")}
                customStyle={backgrounds.green}
              />
            </View>
          </View>
        </View>
      </CustomBottomSheet>
    </View>
  );
}

export default FilterHistory;
