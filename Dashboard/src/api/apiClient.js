import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      // refresh cookie sets new accessToken cookie
      await api.get("/auth/refresh");

      return api(original);
    }

    return Promise.reject(err);
  }
);

export default api;
