import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserType = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    //  console.log('Get type:', req.user);

    return req.user;
  },
);
