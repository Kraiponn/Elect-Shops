import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayloadWithRefreshToken } from '../interfaces';

export const JwtPayloadByKey = createParamDecorator(
  (
    data: keyof IJwtPayloadWithRefreshToken | undefined,
    ctx: ExecutionContext,
  ) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    // console.log('Get user token ', user);

    if (!data) user;

    return user[data];
  },
);
