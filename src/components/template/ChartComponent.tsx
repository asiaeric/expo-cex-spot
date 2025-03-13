import { SVGRenderer, SkiaChart } from "@wuba/react-native-echarts";
import { BarChart, CandlestickChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapPiecewiseComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { useEffect, useRef } from "react";
import { Dimensions } from "react-native";

// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  BarChart,
  LineChart,
  CandlestickChart,
  VisualMapPiecewiseComponent,
]);

const E_HEIGHT = 250;
const E_WIDTH = Dimensions.get("screen").width;

const ChartComponent = ({ option }: any) => {
  const skiaRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "light", {
        renderer: "svg",
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SkiaChart ref={skiaRef} />;
};

export default ChartComponent;
