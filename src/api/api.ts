const API_URL = "http://localhost:3000";

export const api = {
  // 🔐 LOGIN
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
  },

  // 📝 REGISTER
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Register failed");

    return res.json();
  },

  // 👤 GET PROFILE (/me)
  fetchProfile: async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Unauthorized");

    return res.json();
  },

  // ✏️ UPDATE PROFILE
  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Update failed");

    return res.json();
  },



  getParents: async () => {
  const res = await fetch("http://localhost:3000/auth?role=PARENT", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
},

getStudents:async()=>{
   const res = await fetch("http://localhost:3000/students", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();


},


  getClasses: async () => {
    const res = await fetch("http://localhost:3000/classes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  },

  createStudent: async (data: any) => {
    const res = await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erreur création");

    return res.json();
  },


  // 🚪 LOGOUT (optionnel)
  logout: () => {
    localStorage.removeItem("token");
  },
};