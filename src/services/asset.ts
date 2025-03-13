import { fetchData } from "./api";

import { ApiResponse, Asset } from "@/types";

const fetchUserAssets = () => fetchData<ApiResponse<Asset>>("assets/all");

export { fetchUserAssets };
