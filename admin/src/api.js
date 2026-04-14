import axios from "axios";

// Fallback to localhost if the environment variable is not set
const API_URL = process.env.REACT_APP_API_URL || "https://shiksha-main.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
