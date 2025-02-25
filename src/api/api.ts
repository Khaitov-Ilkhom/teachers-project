import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://217.114.4.62:30300/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;