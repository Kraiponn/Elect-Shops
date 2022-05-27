import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces';

import { ACCESS_TOKEN } from '../utils/keys.const';

export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN,
) {
  constructor(configService: ConfigService) {
    super({
      ignoreExpiration: false,
      // secretOrKey: configService.get('ACCESS_TOKEN_KEY'),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: IJwtPayload) {
    console.log('Validate of access token', payload);

    return payload;
  }
}
