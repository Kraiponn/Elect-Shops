import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { OrderType, UserType } from '@prisma/client';

import { GetRoleType, GetUserId } from 'src/auth/decorators';
import { AccessTokenGuard } from 'src/auth/guards';
import { AdminRoleInterceptor } from 'src/auth/interceptors';
import { OrderCreatedDto, OrderUpdatedDto } from './dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /********************************
   * desc      Create order
   * route     Post /v2/api/orders
   * access    Private - USER
   */
  @UseGuards(AccessTokenGuard)
  @Post()
  async createOrder(
    @GetUserId() userId: number,
    @Body() body: OrderCreatedDto,
  ) {
    return await this.orderService.createdOrder(userId, body);
  }

  /********************************
   * desc      Update order
   * route     Put /v2/api/orders/:orderId
   * access    Private - Owner order or ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Put('/:orderId')
  updatedOrder(
    @Param('orderId') orderId: number,
    @Body() body: OrderUpdatedDto,
    @GetRoleType('role') role: UserType,
    @GetUserId() userId: number,
  ) {
    return this.orderService.updatedOrder(Number(orderId), body, userId, role);
  }

  /********************************
   * desc      Update order status
   * route     Put /v2/api/orders/:orderId/status
   * access    Private - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AdminRoleInterceptor)
  @Put('/:orderId/status')
  updatedOrderStatus(@Param('orderId') orderId: number, status: OrderType) {
    return this.orderService.updateOrderStatus(Number(orderId), status);
  }

  /********************************
   * desc      Delete order by id
   * route     Delete /v2/api/orders/:orderId
   * access    Private - Owner order or ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @Delete('/:orderId')
  deletedOrder(
    @GetUserId() userId: number,
    @GetRoleType('role') role: UserType,
    @Param('orderId') orderId: number,
  ) {
    return this.orderService.deletedOrder(userId, role, Number(orderId));
  }

  /********************************
   * desc      Get order by id
   * route     Get /v2/api/orders/:orderId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get('/:orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(Number(orderId));
  }

  /********************************
   * desc      Get many orders with pagination
   * route     Get /v2/api/orders?page=xx&limit=xx
   * access    Private(ADMIN)
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AdminRoleInterceptor)
  @Get()
  getOrders(@Query('page') page: number, @Query('limit') limit: number) {
    return this.orderService.getOrders(Number(page), Number(limit));
  }
}
