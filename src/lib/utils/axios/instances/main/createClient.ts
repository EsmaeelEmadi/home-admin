"use client";

import { logout, refresh } from "../../services/auth";
import {
  getAccessToken,
  getCredentials,
  isTokenExpired,
  storeCredentials,
} from "@/utils/auth";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

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

      // If error, process all the requests in the queue and logout the user.
      const handleError = (err: PromiseLike<unknown>) => {
        processQueue(err);
        logout();
        return Promise.reject(err);
      };

      // Refresh token conditions
      if (
        error.response?.status === 401 &&
        originalRequest?.url !== refreshTokenUrl &&
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
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

        const cred = getCredentials();

        if (cred) {
          const isRefreshExpired = isTokenExpired(
            cred.issuedAt,
            Number(cred.refreshExpiresIn),
          );

          if (!isRefreshExpired) {
            return refresh(cred)
              .then((data) => {
                storeCredentials(data.data);
                processQueue(null);
                return client(originalRequest);
              }, handleError)
              .finally(() => {
                isRefreshing = false;
              });
          }
          return handleError(error);
        }

        isRefreshing = false;
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return client;
};
