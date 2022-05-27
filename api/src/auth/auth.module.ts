import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [PrismaModule, PassportModule.register({}), JwtModule.register({})],
  providers: [
    UserService,
    AdminService,
    AccessTokenStrategy,
    // RefreshTokenStrategy,
  ],
  controllers: [AdminController, UserController],
})
export class AuthModule {}
