import { fetchData } from "./api";

import { FeeSchema } from "@/schemas";
import { Fee } from "@/types";

export const fetchFee = async (symbol: string): Promise<Fee> => {
  const response = await fetchData<Fee>(`fees/${symbol}`);
  return FeeSchema.parse(response);
};
