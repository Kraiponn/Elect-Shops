import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayloadWithRefreshToken } from '../interfaces';

export const JwtPayloadByKey = createParamDecorator(
  (
    data: keyof ITokenPayloadWithRefreshToken | undefined,
    ctx: ExecutionContext,
  ) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    // console.log('Get user token ', user);

    if (!data) return user;

    return user[data];
  },
);
