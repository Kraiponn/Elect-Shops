import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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

  getUniqueId(): string {
    const id = Date.now() + '-' + Math.round(Math.random() * 1e9);

    return id;
  }

  mapDataToOrderDetail(products: number[]): { product_id: number }[] {
    return products.map((product) => {
      return { product_id: Number(product) };
    });
  }

  mapProIdOrdIdToOrderDetail(
    products: number[],
    orderId: string,
  ): {
    data: { product_id: number };
    where: { order_id: string };
  }[] {
    return products.map((product) => {
      return {
        data: { product_id: product },
        where: { order_id: orderId },
      };
    });
  }

  mapProIdOrdIdToOrderDetail2(
    products: number[],
    orderId: string,
  ): { product_id: number; order_id: string }[] {
    return products.map((product) => {
      return { product_id: Number(product), order_id: orderId };
    });
  }

  /***********************************
   * Create order
   */
  async createdOrder(
    userId: number,
    { order_date, address, products }: OrderCreatedDto,
  ): Promise<IOrder> {
    const order = await this.prismaService.order.create({
      data: {
        id: this.getUniqueId(),
        order_date: new Date(order_date),
        address: address ? address : '',
        user_id: userId,
        order_details: {
          create: this.mapDataToOrderDetail(products),
        },
      },
      include: {
        order_details: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) throw new BadRequestException(`Invalid created an order`);

    return order as IOrder;
  }

  /***********************************
   * Update order
   */
  async updatedOrder(
    orderId: string,
    { order_date, address, products, user_id }: OrderUpdatedDto,
    userId: number,
    role: UserType,
  ): Promise<any> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        order_details: true,
      },
    });

    if (!order)
      throw new BadRequestException(`There is no order with id of ${orderId}`);

    // Make account is owner order or Admin account
    if (userId !== order.user_id && role !== UserType.ADMIN)
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

    // Maping productId and orderId to array object
    const productIdAndOrderIdArray = this.mapProIdOrdIdToOrderDetail(
      products,
      orderId,
    );

    try {
      await this.prismaService.order.update({
        where: {
          id: orderId,
        },
        data: {
          order_date: order_date ? new Date(order_date) : order.order_date,
          address: address ? address : order.address,
          user_id: role === UserType.ADMIN ? user_id : order.user_id,
        },
      });

      await this.prismaService.orderDetail.updateMany({
        data: productIdAndOrderIdArray,
      });

      // await this.prismaService.$transaction([newOrder, newOrderDetails]);

      return { message: 'Order updated is successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Can not update..');
    }
  }

  /***********************************
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: OrderType): Promise<any> {
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
    orderId: string,
  ): Promise<any> {
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
  async getOrderById(orderId: string): Promise<any> {
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
    const orders = (await this.prismaService.order.findMany({
      take: limit,
      skip: startIndex,
      orderBy: {
        id: 'asc',
      },
    })) as IOrder[];

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
