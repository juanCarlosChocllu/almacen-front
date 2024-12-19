import axios, { Axios } from "axios";
export const instance:Axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
  });
