import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccessTokenStrategy } from 'src/auth/strategies';

@Module({
  imports: [PrismaModule],
  providers: [OrderService, AccessTokenStrategy],
  controllers: [OrderController],
})
export class OrderModule {}
