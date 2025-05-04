import axios from "axios";
export const instance = axios.create({
  // baseURL: process.env.NODE_ENV !== "production" ? process.env.API_URL : "http://localhost:3000"
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
