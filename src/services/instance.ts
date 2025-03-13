/* eslint-disable no-console */
import ky from "ky";

import { VI_LANG } from "@/constants";
import store from "@/stores";

const API_URL = "https://qc.chapi.vcex.network/api/v1/";

const getAuthToken = () => {
  const { userModel } = store.getState();
  return userModel.user?.token;
};

const apiClient = ky.extend({
  prefixUrl: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
  retry: {
    limit: 2,
    statusCodes: [408, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set("X-Partner-Id", "1");
        request.headers.set("Accept-Language", VI_LANG);
        const token = getAuthToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          throw new Error(
            `API Error ${response.status}: ${await response.text()}`,
          );
        }
      },
    ],
  },
});

export const handleApiError = (error: unknown, endpoint: string) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";
  console.error(`API Error at [${endpoint}]: ${message}`);
  return new Error(`API Error at [${endpoint}]: ${message}`);
};

export default apiClient;
