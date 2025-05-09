import { instance } from "@/lib/axios";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  User,
  RefreshTokenResponse,
} from "@/types/auth";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await instance.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    const { data } = await instance.post<User>("/auth/register", credentials);
    return data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const { data } = await instance.get<RefreshTokenResponse>("/auth/refresh");
    return data;
  },

  logout: async (): Promise<void> => {
    await instance.post("/auth/logout");
  },

  getProfile: async (): Promise<User> => {
    const { data } = await instance.get<User>("/auth/profile");
    return data;
  },
};
