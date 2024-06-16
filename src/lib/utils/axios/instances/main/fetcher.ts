import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export const GET = (url: string, config?: AxiosRequestConfig) => {
  return client.get(url, config).then((response) => response.data);
};

export const POST = <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
) => {
  return client
    .post(url, data.arg, config)
    .then((response) => response.data as T);
};

export const PUT = <T>(url: string, data: any, config?: AxiosRequestConfig) => {
  return client
    .put(url, data.arg, config)
    .then((response) => response.data as T);
};

export const DELETE = (url: string, config?: AxiosRequestConfig) => {
  return client.delete(url, config).then((response) => response.data);
};

export const PATCH = (url: string, data: any, config?: AxiosRequestConfig) => {
  return client.patch(url, data, config).then((response) => response.data);
};
