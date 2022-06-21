import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccessTokenStrategy } from 'src/auth/strategies';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/features/configs/multer.config';

@Module({
  imports: [PrismaModule, MulterModule.register(MulterConfig)],
  providers: [OrderService, AccessTokenStrategy],
  controllers: [OrderController],
})
export class OrderModule {}
