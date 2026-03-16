import axios from "axios";

// create axios instance
const app = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL
});

// interceptor
app.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
app.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);


export default app;
