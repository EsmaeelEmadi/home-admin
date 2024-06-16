import { GET } from "../instances/main/fetcher";

export const auditLog = (url: string) => {
  return GET(url, { authorization: true });
};
