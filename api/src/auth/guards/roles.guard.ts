import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';
import { ROLES_KEY } from '../utils/keys.const';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('Roles', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.userType?.includes(role));

    // console.log('Role guard', req, req.user);
    console.log('Role guard 2', req.user);
    return true;
  }
}
