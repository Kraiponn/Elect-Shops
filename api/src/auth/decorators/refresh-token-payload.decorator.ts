import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshTokenPayload = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log('From refreshToken decorator', user);

    return user;
  },
);
