import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from '../interfaces';

export const UserIdFromJwt = createParamDecorator(
  (_: undefined, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as IJwtPayload;

    if (!user) user;

    return user.sub;
  },
);
