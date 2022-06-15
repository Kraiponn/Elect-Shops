export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface ITokenPayload {
  sub: number;
  email: string;
  role?: string;
}

export interface ITokenPayloadWithRefreshToken extends ITokenPayload {
  refresh_token: string;
}
