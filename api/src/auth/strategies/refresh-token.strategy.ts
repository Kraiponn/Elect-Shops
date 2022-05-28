import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IJwtPayloadWithRefreshToken } from '../interfaces';
import { REFRESH_TOKEN } from '../utils/keys.const';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN,
) {
  constructor(configService: ConfigService) {
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
      secretOrKey: configService.get<string>('REFRESH_TOKEN_KEY'),
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
