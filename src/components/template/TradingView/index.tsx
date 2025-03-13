import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import ByronKlineChart, { KLineIndicator } from "react-native-kline";

import { AppIcon, AppText, CustomBottomSheet } from "@/components/atoms";
import { BottomSheetRefProps } from "@/components/atoms/CustomBottomSheet";
import { CHART_INDICATORS, CHART_TIMELINE } from "@/constants";
import { useChartSubscription } from "@/hooks/useChartSubscription";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { useTheme } from "@/theme";
import { ChartLabelTimeline, IChartIndicator } from "@/types";

const TradingView = () => {
  const { t } = useTranslation("common");
  const { currentPair } = useStoreState((state) => state.tradingPairModel);
  const { currentTimeQuery } = useStoreState((state) => state.chartModel);
  const { layout, gutters, fonts, components, backgrounds, colors, borders } =
    useTheme();
  const [time, setTime] = useState<ChartLabelTimeline>(CHART_TIMELINE[0]);
  const [indicator, setIndicator] = useState<IChartIndicator | undefined>(
    undefined,
  );
  const { chartData } = useStoreState((state) => state.chartModel);
  const { fetchChartHistory, resetCurrentTimeQuery } = useStoreActions(
    (state) => state.chartModel,
  );
  const toolBSRef = useRef<BottomSheetRefProps>(null);

  useChartSubscription({ code: currentPair?.code || "", interval: time.id });

  useEffect(() => {
    onMoreKLineData();
  }, [time.id]);

  const onMoreKLineData = () => {
    fetchChartHistory({
      symbol: currentPair?.code || "",
      limit: 300,
      interval: time.id,
      toDate: currentTimeQuery,
    });
  };

  const renderTimeline = useCallback(() => {
    return (
      <View style={[layout.row, backgrounds.card]}>
        {CHART_TIMELINE.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[gutters.marginHorizontal_10, gutters.marginVertical_10]}
            onPress={() => {
              if (time.id !== item.id) {
                setTime(item);
                resetCurrentTimeQuery();
              }
            }}>
            <Text
              style={[
                fonts.size_12,
                fonts.gray800,
                time.id === item.id && fonts.red500,
              ]}>
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                t(`${item.id}`)
              }
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [time]);

  const renderIndicator = useCallback(() => {
    return (
      <View style={[layout.row, layout.itemsCenter, backgrounds.card]}>
        {CHART_INDICATORS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[gutters.marginHorizontal_10, gutters.marginVertical_10]}
            onPress={() => {
              if (!indicator) {
                setIndicator(item);
              } else if (indicator.id !== item.id) {
                setIndicator(item);
              } else {
                setIndicator(undefined);
              }
            }}>
            <Text
              style={[
                fonts.size_12,
                fonts.gray800,
                indicator && indicator.id === item.id && fonts.red500,
              ]}>
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                t(`${item.id}`)
              }
            </Text>
          </TouchableOpacity>
        ))}
        <Pressable
          style={[layout.row, layout.flex_1]}
          onPress={() => toolBSRef.current?.open()}>
          <AppIcon name="ChartArea" size={18} color={colors.gray800} />
        </Pressable>
      </View>
    );
  }, [indicator]);

  const renderTradingView = useCallback(() => {
    const indicators: KLineIndicator[] = [];
    if (indicator && indicator.id === "MA") {
      indicators.push(KLineIndicator.MainMA);
    }
    return (
      <ByronKlineChart
        style={[components.chartContainer, layout.fullWidth, layout.halfScreen]}
        datas={chartData}
        onMoreKLineData={onMoreKLineData}
        indicators={indicators}
      />
    );
  }, [indicator, time, chartData]);

  const renderToolBS = useCallback(() => {
    const indicators = () => {
      return (
        <>
          <View style={gutters.marginHorizontal_12}>
            <AppText.H5>Chỉ báo</AppText.H5>
          </View>
          <View style={[gutters.marginHorizontal_12, gutters.marginTop_24]}>
            <AppText.SubTitle>Chính</AppText.SubTitle>
            <View style={[layout.row, layout.itemsCenter, { columnGap: 12 }]}>
              {CHART_INDICATORS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    gutters.marginVertical_12,
                    layout.flex_1,
                    borders.rounded_8,
                    borders.w_1,
                    gutters.padding_10,
                    layout.itemsCenter,
                    indicator &&
                      indicator.id === item.id && {
                        borderColor: colors.gray800,
                      },
                  ]}
                  onPress={() => {
                    if (!indicator) {
                      setIndicator(item);
                    } else if (indicator.id !== item.id) {
                      setIndicator(item);
                    } else {
                      setIndicator(undefined);
                    }
                  }}>
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.gray800,
                      indicator && indicator.id === item.id && fonts.red500,
                    ]}>
                    {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      t(`${item.id}`)
                    }
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      );
    };

    return (
      <CustomBottomSheet ref={toolBSRef}>{indicators()}</CustomBottomSheet>
    );
  }, [indicator]);

  return (
    <View>
      {renderTimeline()}
      {renderTradingView()}
      {renderIndicator()}
      {renderToolBS()}
    </View>
  );
};

export default memo(TradingView);
