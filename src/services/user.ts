import instance, { handleApiError } from "./instance";

import { TokenSchema, UserSchema } from "@/schemas";
import { SignInDTO } from "@/types";
const apiUrl = "https://qc.cex-partner-backend.vcex.network/v1/";

export const signIn = async (params: SignInDTO) => {
  const path = `${apiUrl}auth/login`;
  try {
    const response = await instance
      .extend({ prefixUrl: "" })
      .post(path, { json: params })
      .json();

    return TokenSchema.parse(response);
  } catch (error) {
    throw handleApiError(error, path);
  }
};

export const signUp = async (params: SignInDTO) => {
  try {
    const response = await instance
      .extend({ prefixUrl: "" })
      .post(`${apiUrl}auth/login`, { json: params })
      .json();

    return TokenSchema.parse(response);
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in. Please try again.");
  }
};

export const getMe = async () => {
  const path = `${apiUrl}auth/me`;
  try {
    const response = await instance.extend({ prefixUrl: "" }).get(path).json();
    return UserSchema.parse(response);
  } catch (error) {
    throw handleApiError(error, path);
  }
};
