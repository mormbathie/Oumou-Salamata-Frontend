import { apiClient } from "./clients";

export const authApi = {
  login: (email: string, password: string) =>
    apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (data: any) =>
    apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};