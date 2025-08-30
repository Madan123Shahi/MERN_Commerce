import axios from "axios";

const api = axios.create({
  baseURL: import.meta.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: false, // Set true if using cookie/session
});

export default api;
