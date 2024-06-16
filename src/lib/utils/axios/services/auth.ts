import { ICredentials, ILoginRequest } from "@/types/api/auth";
import { POST, PUT } from "../instances/main/fetcher";
import { AxiosResponse } from "axios";

export const login = (url: string, args: any) => {
  return POST(url, args);
};

export const logout = () => {
  return PUT("auth/logout", undefined, { authorization: true });
};

export const refresh = (credentials: ICredentials) => {
  return POST<AxiosResponse<ICredentials>>("auth/refresh", {
    arg: credentials,
  });
};
