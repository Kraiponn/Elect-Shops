import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AccessTokenStrategy } from 'src/auth/strategies';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  providers: [CategoryService, AccessTokenStrategy],
  controllers: [CategoryController],
})
export class CategoryModule {}
