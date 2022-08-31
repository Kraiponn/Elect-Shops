import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserType } from '@prisma/client';

import { GetRoleType, GetUserId } from 'src/auth/decorators';
import { AccessTokenGuard } from 'src/auth/guards';
import { AdminRoleInterceptor } from 'src/auth/interceptors';
import { OrderCreatedDto, OrderUpdatedDto, OrderUpdateStatusDto } from './dto';
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
  // @UseInterceptors(FileInterceptor('image'))
  async createOrder(
    @GetUserId() userId: number,
    @Body() body: OrderCreatedDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(body.products);
    // return { message: 'successfully' };
    return await this.orderService.createdOrder(userId, body);
  }

  /********************************
   * desc      Update order
   * route     Put /v2/api/orders/:orderId
   * access    Private - Owner order or ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put('/:orderId')
  updatedOrder(
    @Param('orderId') orderId: string,
    @Body() body: OrderUpdatedDto,
    @GetRoleType('role') role: UserType,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.orderService.updatedOrder(orderId, body, role);
  }

  /********************************
   * desc      Update order status
   * route     Put /v2/api/orders/:orderId/status
   * access    Private - ADMIN
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AdminRoleInterceptor)
  @Put('/:orderId/status')
  updatedOrderStatus(
    @Param('orderId') orderId: string,
    @Body() body: OrderUpdateStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, body);
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
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.deletedOrder(userId, role, orderId);
  }

  /********************************
   * desc      Get many orders by userId with pagination
   * route     Get /v2/api/orders/me-all?page=xx&limit=xx
   * access    Private(USER)
   */
  @UseGuards(AccessTokenGuard)
  @Get('/me-all')
  getOrdersByUserId(
    @GetUserId() userId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    // console.log('hello', userId);
    // return 'ok';
    return this.orderService.getOrdersByUserId(
      userId,
      Number(page),
      Number(limit),
    );
  }

  /********************************
   * desc      Get order by id
   * route     Get /v2/api/orders/:orderId
   * access    Private
   */
  @UseGuards(AccessTokenGuard)
  @Get('/:orderId')
  getOrderById(
    @Param('orderId') orderId: string,
    @GetRoleType('role') role: UserType,
    @GetUserId() userId: number,
  ) {
    return this.orderService.getOrderById(orderId, role, userId);
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
