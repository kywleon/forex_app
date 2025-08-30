import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getLatestRates: async () => {
    const res = await instance.get("/rates/latest");
    return res.data;
  },
  getRatesByDate: async (date) => {
    const res = await instance.get(`/rates/${date}`);
    return res.data;
  },
};

export default api;
