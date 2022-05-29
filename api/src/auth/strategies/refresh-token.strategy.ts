import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IJwtPayload, IJwtPayloadWithRefreshToken } from '../interfaces';
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
          const refrshToken = req?.cookies['refresh_token'];

          // console.log('cookie from request', req?.cookies, refrshToken);
          if (!refrshToken) return null;

          return refrshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: IJwtPayload): IJwtPayloadWithRefreshToken {
    // console.log('Validate of refresh token', payload);

    const refresh_token = req?.cookies['refresh_token'];

    return {
      ...payload,
      refresh_token,
    };
  }
}
