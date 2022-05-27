import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserIdFromJwt = createParamDecorator(
  (_: undefined, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) user;

    return user.sub;
  },
);
