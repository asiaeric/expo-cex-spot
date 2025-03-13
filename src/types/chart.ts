interface Chart {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  turnover: number;
  totalBase?: number;
  totalQuote?: number;
  numberOfTrades?: number;
}

type ChartHistory = string[];

type ChartTimeLine = "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w";

interface ChartQuery {
  symbol: string;
  limit: number;
  interval: ChartTimeLine;
  toDate: string;
}

enum ChartAction {
  BUY = "BUY",
  SELL = "SELL",
}

type ChartType = "LIMIT" | "MARKET";

interface CharLabelTimeline {
  label: string;
  id: string;
}

interface IChartIndicator {
  label: string;
  id: ChartIndicator;
}

enum ChartStatus {
  ORDER_SUBMITTED = "ORDER_SUBMITTED",
  ORDER_FILLED = "ORDER_FILLED",
  ORDER_CANCEL = "ORDER_CANCEL",
}
interface ChartDataParams {
  action: ChartAction;
  price: number;
  quantity: number;
  symbol: string;
  type: ChartType;
}

type ChartPair =
  | "USDT_VIC"
  | "BNB_KDG"
  | "USDT_KDG"
  | "SHIB_VIC"
  | "DOGE_VIC"
  | "SOL_VIC"
  | "DOT_VIC"
  | "BNB_VIC"
  | "ETH_VIC"
  | "BTC_VIC"
  | "TON_VIC";

type ChartIndicator = "MA" | "EMA" | "BOLL" | "SAR" | "AVL";

type ChartLabelTimeline = {
  id: ChartTimeLine;
  label: string;
};

type ChartIndicators = {
  id: ChartTimeLine;
  label: string;
};

interface ChartParams {
  symbol: string;
  limit: number;
  interval: ChartTimeLine;
  toDate: string;
}

interface UpdateChartFilledStatusPayload {
  id: number;
  filled: number;
}

enum FetchChartStatus {
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  ACTIVE = "ACTIVE",
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
}

interface FetchChartRequest {
  page: number;
  extraSize?: number;
}

export {
  Chart,
  ChartHistory,
  ChartTimeLine,
  ChartQuery,
  ChartAction,
  ChartType,
  CharLabelTimeline,
  IChartIndicator,
  ChartStatus,
  ChartDataParams,
  ChartPair,
  ChartIndicator,
  ChartLabelTimeline,
  ChartIndicators,
  ChartParams,
  UpdateChartFilledStatusPayload,
  FetchChartStatus,
  FetchChartRequest,
};
