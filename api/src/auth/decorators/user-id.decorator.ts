import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from '../interfaces';

export const GetUserId = createParamDecorator(
  (_: undefined, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as ITokenPayload;

    if (!user) return null;

    return user.sub;
  },
);
