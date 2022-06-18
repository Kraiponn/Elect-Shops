import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayloadWithRole } from '../interfaces';

export const GetRoleType = createParamDecorator(
  (data: keyof ITokenPayloadWithRole | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!data) return user;

    return user[data];
  },
);
