"use client";

import { logout, refresh } from "../../services/auth";
import {
  getAccessToken,
  getCredentials,
  getRefreshToken,
  isTokenExpired,
  storeCredentials,
} from "@/utils/auth";
import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from "axios";

interface ICreateClientProps {
  options: CreateAxiosDefaults;
}

type TCreateClient = (args: ICreateClientProps) => AxiosInstance;

let failedQueue: {
  reject: (value?: unknown) => void;
  resolve: (value?: unknown) => void;
}[] = [];

let isRefreshing = false;
const refreshTokenUrl = "auth/refresh";

const processQueue = (error?: PromiseLike<unknown> | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

export const createClient: TCreateClient = ({ options }) => {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      if (config.authorization === true) {
        const token = getAccessToken();
        if (token) {
          // config.headers.Authorization = `Bearer ${token.accessToken}`;
          config.headers.set("Authorization", `Bearer ${token.accessToken}`);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      // In "axios": "^1.1.3" there is an issue with headers, and this is the workaround.
      originalRequest.headers = JSON.parse(
        JSON.stringify(originalRequest.headers || {}),
      );
      const refreshToken = getRefreshToken();

      // If error, process all the requests in the queue and logout the user.
      const handleError = (error: PromiseLike<unknown>) => {
        processQueue(error);
        logout();
        return Promise.reject(error);
      };

      console.log({ error });

      // console.log(
      //   refreshToken?.refreshToken &&
      //     error.response?.status === 401 &&
      //     originalRequest?.url !== refreshTokenUrl &&
      //     originalRequest?._retry !== true
      // );

      // console.log(
      //   // refreshToken,
      //   // error.response?.status,
      //   originalRequest?.url,
      //   refreshTokenUrl,
      //   originalRequest?._retry
      // );

      // Refresh token conditions
      if (
        error.response?.status === 401 &&
        originalRequest?.url !== refreshTokenUrl &&
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        isRefreshing = true;
        originalRequest._retry = true;

        // const isAccessExpired = isTokenExpired(
        //   access.issuedAt,
        //   Number(access.expiresIn),
        // );

        const cred = getCredentials();

        console.log("condition 0");

        if (cred) {
          console.log("condition 1");
          const isRefreshExpired = isTokenExpired(
            cred.issuedAt,
            Number(cred.refreshExpiresIn),
          );

          if (!isRefreshExpired) {
            console.log("condition 2");
            return refresh(cred)
              .then((data) => {
                storeCredentials(data.data);
                processQueue(null);
                return client(originalRequest);
              }, handleError)
              .finally(() => {
                isRefreshing = false;
              });
          } else {
            console.log("condition 3");
            return handleError(error);
          }
        } else {
          console.log("condition 4");
          isRefreshing = false;
        }

        // return client
        //   .post(refreshTokenUrl, {
        //     refreshToken: refreshToken,
        //   })
        //   .then((res) => {
        //     console.log(res);
        //     const tokens = {
        //       accessToken: res.data?.accessToken,
        //       refreshToken: res.data?.refreshToken,
        //     };
        //     // setRefreshedTokens(tokens);
        //     processQueue(null);

        //     return client(originalRequest);
        //   }, handleError)
        //   .finally(() => {
        //     isRefreshing = false;
        //   });
      }

      // // Refresh token missing or expired => logout user...
      // if (
      //   error.response?.status === 401 &&
      //   error.response?.data?.message === "TokenExpiredError"
      // ) {
      //   return handleError(error);
      // }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return client;
};
