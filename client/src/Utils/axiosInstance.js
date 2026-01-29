import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/food",
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("API CALL:", config.method, config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
