import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const loginUser = (data: any) => {
    setUser(data.user);
    localStorage.setItem("token", data.access_token);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};