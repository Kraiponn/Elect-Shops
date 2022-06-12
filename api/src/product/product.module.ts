import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AccessTokenStrategy } from 'src/auth/strategies';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterConfig } from 'src/features/configs/multer.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    MulterModule.register(MulterConfig),
  ],
  controllers: [ProductController],
  providers: [ProductService, AccessTokenStrategy],
})
export class ProductModule {}
