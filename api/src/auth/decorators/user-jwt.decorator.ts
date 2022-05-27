import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayloadWithRefreshToken } from '../interfaces';

export const UserFromJwt = createParamDecorator(
  (
    data: keyof IJwtPayloadWithRefreshToken | undefined,
    ctx: ExecutionContext,
  ) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!data) user;

    return user[data];
  },
);
