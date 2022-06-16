import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderType } from '@prisma/client';
import { IPaginate } from 'src/features/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderCreatedDto, OrderUpdatedDto } from './dto';
import { IOrder } from './interfaces';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  /***********************************
   * Create order
   */
  async createdOrder(
    userId: number,
    { order_date, address, product_id }: OrderCreatedDto,
  ): Promise<IOrder> {
    const order = (await this.prismaService.order.create({
      data: {
        order_date,
        address: address ? address : '',
        product_id,
        user_id: userId,
      },
    })) as IOrder;

    return order;
  }

  /***********************************
   * Update order
   */
  async updatedOrder(
    orderId: number,
    { order_date, address, product_id, user_id }: OrderUpdatedDto,
  ): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
    });

    if (!order)
      throw new BadRequestException(`There is no order with id of ${orderId}`);

    return await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        order_date: order_date ? order_date : order.order_date,
        address: address ? address : order.address,
        product_id: product_id ? product_id : order.product_id,
        user_id: user_id ? user_id : order.user_id,
      },
    });
  }

  /***********************************
   * Update order status
   */
  async updateOrderStatus(orderId: number, status: OrderType): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
    });

    if (!order)
      throw new BadRequestException(`There is no order with id of ${orderId}`);

    return await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  /***********************************
   * Remove order
   */
  async deletedOrder(orderId: number): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order)
      throw new BadRequestException(`Order not found with id of ${orderId}`);

    const delOrder = await this.prismaService.order.delete({
      where: { id: orderId },
    });

    return delOrder;
  }

  /***********************************
   * Get order by Id
   */
  async getOrderById(orderId: number): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
    });

    if (!order)
      throw new NotFoundException(
        `There is no order with this id of ${orderId}`,
      );

    return order;
  }

  /***************************************************
   * Query orders and response with pagination
   */
  async getOrders(
    page: number,
    limit: number,
  ): Promise<{ pagination: IPaginate; orders: IOrder[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const total = await this.prismaService.order.count();
    const orders = await this.prismaService.order.findMany({
      take: limit,
      skip: startIndex,
      orderBy: {
        id: 'asc',
      },
    });

    const pagination: IPaginate = {
      total,
      current: page,
      next: {
        page: 0,
        limit,
      },
      prev: {
        page: 0,
        limit,
      },
    };

    if (lastIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    return {
      pagination,
      orders,
    };
  }
}
