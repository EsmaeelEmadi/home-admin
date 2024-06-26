import { ICredentials } from "@/types/api/auth";
import { POST, PUT } from "../instances/main/fetcher";

export const login = (url: string, args: any) => {
  return POST(url, args);
};

export const logout = () => {
  return PUT("auth/logout", undefined, { authorization: true });
};

export const refresh = (credentials: ICredentials) => {
  return POST<ICredentials>("auth/refresh", {
    arg: credentials,
  });
};
