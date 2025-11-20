import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check the current logged-in user
  const fetchMe = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me"); // cookies are automatically sent
      setUser(res.data);
    } catch (err) {
      // NOT logged in → 401 → user stays null
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // Login user
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    // backend sets cookies + returns user
    setUser(res.data);
    return res.data;
  };

  // Register user
  const register = async (payload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  };

  // Logout user
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  // Force token refresh manually
  const refresh = async () => {
    try {
      const res = await api.get("/auth/refresh");
      setUser(res.data); // refresh returns user
      return res.data;
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, logout, register, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};
