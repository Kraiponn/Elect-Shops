import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IJwtPayloadWithRefreshToken } from '../interfaces';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookie = req?.cookies;
          console.log('cookie from request', cookie);
          if (!cookie) return null;

          return cookie;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('REFRESH_TOKEN_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any): IJwtPayloadWithRefreshToken {
    console.log('Validate of refresh token', payload);

    const refresh_token = 'xxxx';

    return {
      ...payload,
      refresh_token,
    };
  }
}
