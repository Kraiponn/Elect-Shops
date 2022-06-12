import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterConfig } from './features/configs/multer.config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CloudinaryModule,
    // MulterModule.register(MulterConfig),
    AuthModule,
    PrismaModule,
    CategoryModule,
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
