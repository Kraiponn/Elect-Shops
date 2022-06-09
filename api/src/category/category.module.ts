import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/features/configs/multer.config';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/auth/strategies';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    MulterModule.register(MulterConfig),
  ],
  providers: [CategoryService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [CategoryController],
})
export class CategoryModule {}
