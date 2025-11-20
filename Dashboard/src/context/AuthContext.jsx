import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me"); // backend checks cookie
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // backend clears cookies
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => useContext(AuthContext);
