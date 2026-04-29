import { apiClient } from "./clients";

export const studentsApi = {
  getAll: (filters?: any) => {
    const query = filters
      ? "?" + new URLSearchParams(filters).toString()
      : "";

    return apiClient(`/students${query}`);
  },

  create: (data: any) =>
    apiClient("/students", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient(`/students/${id}`, {
      method: "DELETE",
    }),

  update: (id: string, data: any) =>
    apiClient(`/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

    getById: async (id: string) => {
  const res = await fetch(`http://localhost:3000/students/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
},
};