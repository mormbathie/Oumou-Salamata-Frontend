import { apiClient } from "./clients";

export const parentsApi = {
  getAll: () => apiClient("/auth?role=PARENT"),
};