import { apiClient } from "./clients";

export const usersApi = {
  getProfile: () => apiClient("/users/me"),

  updateProfile: (data: any) =>
    apiClient("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};