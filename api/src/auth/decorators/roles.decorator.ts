import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { ROLES_KEY } from '../utils/keys.const';

export const Roles = (...args: UserType[]) => SetMetadata(ROLES_KEY, args);
