import { createClient } from "./createClient";

const options = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
} as const;

export const client = createClient({ options });
