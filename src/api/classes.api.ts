import { apiClient } from "./clients";

export const classesApi = {
  getAll: () => apiClient("/classes"),
};