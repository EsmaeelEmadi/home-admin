import { GET, POST, DELETE, PUT } from "../instances/main/fetcher";

export const residentialGetAll = (url: string) => {
  return GET(url, { authorization: true });
};

export const residentialGetById = (url: string) => {
  return GET(url, { authorization: true });
};

export const residentialPost = (url: string, args: any) => {
  return POST(url, args, { authorization: true });
};

export const residentialPut = (url: string, args: any) => {
  return PUT(url, args, { authorization: true });
};

export const residentialDelete = (
  url: string,
  { arg: id }: { arg: number },
) => {
  const internalUrl = `${url}/${id}`;
  return DELETE(internalUrl, { authorization: true });
};
