import { fetchData } from "./api";

import { StatisticsArraySchema } from "@/schemas";
import { Statistic, StatisticQuery } from "@/types";

export const fetchStatistic = async (
  params: StatisticQuery,
): Promise<Statistic[]> => {
  const response: Statistic = await fetchData("chart/ticker/24hr", {
    searchParams: params,
  });
  return StatisticsArraySchema.parse(response);
};
