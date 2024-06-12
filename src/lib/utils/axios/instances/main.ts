/**
 * DOC: https://axios-http.com/docs/instance
 */

import axios from "axios";

export const axiosMain = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
