export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAccessToken {
  accessToken: string;
  expiresIn: string;
  issuedAt: number;
}

export interface IRefreshToken {
  refreshExpiresIn: string;
  refreshToken: string;
  issuedAt: number;
}

export interface IPermission {
  resource: string;
  scopes: string[];
}

export interface ICredentials extends IAccessToken, IRefreshToken {
  idToken: string;
  permissions: IPermission[];
  tokenType: string;
  issuedAt: number; // NOTE: not a part of the API, added to make it easier to work with
}
