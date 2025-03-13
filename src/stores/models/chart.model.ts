import dayjs from "dayjs";
import { Action, Thunk, action, thunk } from "easy-peasy";
import { KLineBar } from "react-native-kline";

import { NUMBER_BARS_QUERY } from "@/constants";
import { DATE_FORMATS } from "@/constants/dateFormats";
import { getChartHistory } from "@/services/chart";
import { Chart, ChartParams } from "@/types";

function subtractMilliseconds(
  dateTimeString: string,
  milliseconds: number,
): string {
  return dayjs(dateTimeString)
    .subtract(milliseconds, "milliseconds")
    .format(DATE_FORMATS.DATE_TIME);
}

const milliseconds = (payload: ChartParams) => {
  const minutes = 60 * 1000;
  switch (payload.interval) {
    case "1m":
      return minutes;
    case "5m":
      return 5 * minutes;
    case "15m":
      return 15 * minutes;
    case "1h":
      return 60 * minutes;
    case "4h":
      return 4 * 60 * minutes;
    case "1d":
      return 24 * 60 * minutes;
    case "1w":
      return 7 * 24 * 60 * minutes;

    default:
      return minutes;
  }
};
export interface ChartState {
  chartData: KLineBar[];
  chartSignal: Chart | undefined;
  currentTimeQuery: string;
}

export interface ChartActions {
  updateChartSignal: Action<this, KLineBar>;
  setChartHistory: Action<this, KLineBar[]>;
  sendChartSignal: Action<this, Chart>;
  setCurrentTime: Action<this, string>;
  resetCurrentTimeQuery: Action<this>;
}

export interface ChartThunks {
  fetchChartHistory: Thunk<this, ChartParams>;
}

export interface ChartModel extends ChartState, ChartActions, ChartThunks {}

export const chartModel: ChartModel = {
  chartData: [],
  chartSignal: undefined,
  currentTimeQuery: dayjs().format(DATE_FORMATS.DATE_TIME),
  setChartHistory: action((state, payload) => {
    state.chartData.unshift(...payload);
  }),
  resetCurrentTimeQuery: action((state) => {
    state.currentTimeQuery = dayjs().format(DATE_FORMATS.DATE_TIME);
    state.chartData = [];
  }),
  sendChartSignal: action((state, payload) => {
    state.chartSignal = payload;
  }),
  setCurrentTime: action((state, payload) => {
    state.currentTimeQuery = payload;
  }),

  updateChartSignal: action((state, payload) => {
    state.chartData.push(payload);
  }),
  fetchChartHistory: thunk(async (actions, payload, { getState }) => {
    try {
      const toDate = getState().currentTimeQuery;
      const data = await getChartHistory(payload);
      const newList = data.map((item) => {
        return {
          amount: 0,
          open: item.open,
          close: item.close,
          high: item.high,
          id: item.timestamp / 1000,
          low: item.low,
          vol: item.volume,
          count: 0,
        };
      });
      actions.setChartHistory(newList);
      actions.setCurrentTime(
        subtractMilliseconds(toDate, NUMBER_BARS_QUERY * milliseconds(payload)),
      );
    } catch (err) {
      console.log(err);
    }
  }),
};
