import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterConfig } from 'src/features/configs/multer.config';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({}),
    JwtModule.register({}),
    CloudinaryModule,
    MulterModule.register(MulterConfig),
  ],
  providers: [
    UserService,
    AdminService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AdminController, UserController],
})
export class AuthModule {}
