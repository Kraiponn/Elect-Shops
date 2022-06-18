import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderType, UserType } from '@prisma/client';
import { IPaginate } from 'src/features/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderCreatedDto, OrderUpdatedDto } from './dto';
import { IOrder } from './interfaces';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  getGenerateId(): string {
    const date = new Date();
    const id = 'oid-' + date.getDate();

    return id;
  }

  /***********************************
   * Create order
   */
  async createdOrder(
    userId: number,
    { order_date, address, products }: OrderCreatedDto,
  ): Promise<IOrder> {
    const order = (await this.prismaService.order.create({
      data: {
        id: this.getGenerateId(),
        order_date,
        address: address ? address : '',
        user_id: userId,
        order_details: {
          create: [{ product_id: products[0] }, { product_id: products[1] }],
        },
      },
    })) as IOrder;

    return order;
  }

  /***********************************
   * Update order
   */
  async updatedOrder(
    orderId: number,
    {
      order_date,
      address,
      products,
      user_id,
      amount,
      total_price,
    }: OrderUpdatedDto,
    userId: number,
    role: UserType,
  ): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
    });

    if (!order)
      throw new BadRequestException(`There is no order with id of ${orderId}`);

    // Make account is owner order or Admin account
    if (userId !== order.user_id || role !== UserType.ADMIN)
      throw new ForbiddenException(`Access denie`);

    // Order can not editing the order on ON_WAY and SHIPPING state
    if (
      order.status === OrderType.ON_WAY ||
      order.status === OrderType.SHIPPING
    ) {
      throw new BadRequestException(
        `Can\'t editing the order on ${OrderType.ON_WAY} or ${OrderType.SHIPPING} status`,
      );
    }

    return await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        order_date: order_date ? order_date : order.order_date,
        address: address ? address : order.address,
        products: products ? products : order.products,
        user_id: user_id ? user_id : order.user_id,
        amount: amount ? amount : order.amount,
        total_price: total_price ? total_price : order.total_price,
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
  async deletedOrder(
    userId: number,
    role: UserType,
    orderId: number,
  ): Promise<IOrder> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order)
      throw new BadRequestException(`Order not found with id of ${orderId}`);

    // Order can not cancelled the order on the ON_WAY and SHIPPING state
    if (
      order.status === OrderType.ON_WAY ||
      order.status === OrderType.SHIPPING
    ) {
      throw new BadRequestException(
        `Can\'t cancel the order on ${OrderType.ON_WAY} or ${OrderType.SHIPPING} status`,
      );
    }

    // Make account is owner order or Admin account
    if (userId !== order.user_id || role !== UserType.ADMIN)
      throw new ForbiddenException(`Access denie`);

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
