import { IJwtPayload } from './jwtPayload.interface';

export interface IJwtPayloadWithRefreshToken extends IJwtPayload {
  refresh_token: string;
}
