// // src/api/apiClient.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
//   withCredentials: true, // VERY IMPORTANT: send cookies
// });

// // State to prevent multiple simultaneous refresh calls
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, result = null) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     if (error) reject(error);
//     else resolve(result);
//   });
//   failedQueue = [];
// };

// // Response interceptor: on 401, try refresh and then retry original request
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If no response or not 401, reject immediately
//     if (!error.response || error.response.status !== 401) {
//       return Promise.reject(error);
//     }

//     // Prevent infinite loop if refresh endpoint itself returned 401
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     // Mark request as retrying
//     originalRequest._retry = true;

//     // If refresh already in progress, queue this request
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: () => resolve(api(originalRequest)),
//           reject,
//         });
//       });
//     }

//     isRefreshing = true;

//     try {
//       // Call refresh endpoint. Browser will automatically send the refresh cookie
//       const refreshRes = await api.get("/auth/refresh"); // returns user data if success

//       // After refresh, cookies (accessToken + refreshToken) are re-set by server.
//       // Now retry original request. No Authorization header needed because backend reads cookie.
//       processQueue(null, true);
//       return api(originalRequest);
//     } catch (refreshError) {
//       // refresh failed (e.g., no cookie/invalid/expired) -> flush queue with error
//       processQueue(refreshError, null);
//       // Optionally, you may want to log the user out here (frontend)
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:8000/api
  withCredentials: true, // REQUIRED for cookies
});

export default api;
