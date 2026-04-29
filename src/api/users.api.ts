import { apiClient } from "./clients";

export const usersApi = {
    getProfile: () => apiClient("/users/me"),

    updateProfile: (data: any) =>
        apiClient("/users/me", {
            method: "PATCH",
            body: JSON.stringify(data),
        }),

    // 👥 GET ALL USERS ✅ AJOUT ICI
    getAll: async () => {
        const res = await fetch("http://localhost:3000/auth", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return res.json();
    },

    // 🔐 UPDATE ROLE
    updateRole: async (id: string, role: string) => {
        const res = await fetch(
            `http://localhost:3000/auth/${id}/role`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ role }),
            }
        );

        return res.json();
    
    },
};