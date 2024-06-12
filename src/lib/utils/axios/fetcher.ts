import { axiosMain } from "./instances/main";

export const axiosGetFetcher = (url: string) =>
  axiosMain.get(url).then((response) => response.data);

export const axiosPostFetcher = (url: string, data: any) =>
  axiosMain.post(url, data.arg).then((response) => response.data);

export const axiosPutFetcher = (url: string, data: any) =>
  axiosMain.put(url, data).then((response) => response.data);

export const axiosDeleteFetcher = (url: string) =>
  axiosMain.delete(url).then((response) => response.data);

export const axiosPatchFetcher = (url: string, data: any) =>
  axiosMain.patch(url, data).then((response) => response.data);
