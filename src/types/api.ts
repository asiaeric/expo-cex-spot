type ApiResponse<T> = {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};

type StatisticQuery = {
  size: number;
  page: number;
  fromDate: string;
  toDate: string;
};

export type { ApiResponse, StatisticQuery };
