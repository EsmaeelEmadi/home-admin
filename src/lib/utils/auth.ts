"use client";

// helpers
import { refresh as refreshService } from "./axios/services/auth";

// types
import type {
  ICredentials,
  IAccessToken,
  IRefreshToken,
  IPermission,
} from "@/types/api/auth";

export type TStoreCredentials = (credentials: ICredentials) => void;
export type TGetAccessToken = () => IAccessToken | undefined;
export type TGetRefreshToken = () => IRefreshToken | undefined;
export type TGetPermissions = () => IPermission[] | undefined;
export type TGetIdToken = () => string | undefined;
export type TGetTokenType = () => string | undefined;
export type TRemoveCredentials = () => void;
export type TSetRefreshToken = () => IRefreshToken | undefined;
export type TIsAuthenticated = () => Promise<boolean>;

type TGetCredentials = () => ICredentials | undefined;

export const isTokenExpired = (
  issuedAt?: number,
  expiresIn?: number,
): boolean => {
  if (!issuedAt || !expiresIn) return false;
  return issuedAt + expiresIn * 1000 - new Date().getTime() < 0;
};

export const getCredentials: TGetCredentials = () => {
  if (!process.env.NEXT_PUBLIC_STORAGE_CREDENTIALS) {
    throw new Error("storageCredential should be provided");
  }

  const data = localStorage.getItem(
    process.env.NEXT_PUBLIC_STORAGE_CREDENTIALS,
  );
  if (data) {
    return JSON.parse(data);
  }

  return undefined;
};

export const removeCredentials: TRemoveCredentials = () => {
  if (!process.env.NEXT_PUBLIC_STORAGE_CREDENTIALS) {
    throw new Error("storageCredential should be provided");
  }

  localStorage.removeItem(process.env.NEXT_PUBLIC_STORAGE_CREDENTIALS);
};

export const storeCredentials: TStoreCredentials = (credentials) => {
  if (!process.env.NEXT_PUBLIC_STORAGE_CREDENTIALS) {
    throw new Error("storageCredential should be provided");
  }

  const credentialsWithIssueDate: ICredentials = {
    ...credentials,
    issuedAt: new Date().getTime(),
  };

  localStorage.setItem(
    process.env.NEXT_PUBLIC_STORAGE_CREDENTIALS,
    JSON.stringify(credentialsWithIssueDate),
  );
};

export const getAccessToken: TGetAccessToken = () => {
  const credentials = getCredentials();

  if (credentials) {
    return {
      accessToken: credentials.accessToken,
      expiresIn: credentials.expiresIn,
      issuedAt: credentials.issuedAt,
    };
  }

  return undefined;
};

export const getRefreshToken: TGetRefreshToken = () => {
  const credentials = getCredentials();
  if (credentials) {
    return {
      refreshToken: credentials.refreshToken,
      refreshExpiresIn: credentials.refreshExpiresIn,
      issuedAt: credentials.issuedAt,
    };
  }

  return undefined;
};

export const getPermissions: TGetPermissions = () => {
  const credentials = getCredentials();
  return credentials?.permissions;
};

export const getIdToken: TGetIdToken = () => {
  const credentials = getCredentials();
  return credentials?.idToken;
};

export const getTokenType: TGetTokenType = () => {
  const credentials = getCredentials();
  return credentials?.tokenType;
};

export const isAuthenticated: TIsAuthenticated = async () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  if (!access?.accessToken || !refresh?.refreshToken) return false;

  const isAccessExpired = isTokenExpired(
    access.issuedAt,
    Number(access.expiresIn),
  );
  const isRefreshExpired = isTokenExpired(
    refresh.issuedAt,
    Number(refresh.refreshExpiresIn),
  );

  if (isRefreshExpired) {
    return false;
  }

  if (isAccessExpired) {
    const credentials = getCredentials();

    if (!credentials) return false;

    try {
      const res = await refreshService(credentials);

      if (res.status === 201) {
        storeCredentials(res.data);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  return true;
};
