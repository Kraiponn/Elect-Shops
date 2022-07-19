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
import { OrderCreatedDto, OrderUpdatedDto, OrderUpdateStatusDto } from './dto';
import { IOrder, ISingleOrderResponse } from './interfaces';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  /************************************************************
   * Generate unique Id
   */
  getUniqueId(): string {
    const id = Date.now() + '-' + Math.round(Math.random() * 1e9);

    return id;
  }

  /************************************************************
   * Mapping product_id(products) to array object
   */
  mapDataToOrderDetail(products: number[]): { product_id: number }[] {
    return products.map((product) => {
      return { product_id: Number(product) };
    });
  }

  /************************************************************
   * Mapping product_id(products) and orderId to array object
   */
  mapProIdOrdIdToArrObj(
    products: number[],
    orderId: string,
  ): {
    product_id: number;
    order_id: string;
  }[] {
    return products.map((product) => {
      return {
        product_id: Number(product),
        order_id: orderId,
      };
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
    role: UserType,
  ): Promise<{ message: string }> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        order_details: {
          select: {
            product_id: true,
            order_id: true,
          },
        },
      },
    });

    if (!order)
      throw new BadRequestException(`There is no order with id of ${orderId}`);

    // Make account is owner order or Admin account
    if (Number(user_id) !== order.user_id && role !== UserType.ADMIN)
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

    try {
      // Update the current order and deleted an order_detail table
      await this.prismaService.order.update({
        where: { id: orderId },
        data: {
          order_date: order_date ? new Date(order_date) : order.order_date,
          address: address ? address : order.address,
          user_id: role === UserType.ADMIN ? Number(user_id) : order.user_id,
          order_details: {
            deleteMany: {},
          },
        },
      });

      const orderDetailArrayObject = this.mapProIdOrdIdToArrObj(
        products,
        orderId,
      );

      // Add new order detail
      await this.prismaService.orderDetail.createMany({
        data: orderDetailArrayObject,
      });

      return { message: 'Order updated is successfully' };
    } catch (error) {
      console.log('My Updated error', error);
      throw new InternalServerErrorException('Can not update..');
    }
  }

  /***********************************
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    { status }: OrderUpdateStatusDto,
  ): Promise<{
    message: string;
    order: IOrder;
  }> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
    });

    if (!order)
      throw new BadRequestException(`There is no order with id of ${orderId}`);

    const newOrder = await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
      include: {
        order_details: {
          include: {
            product: true,
          },
        },
      },
    });

    return {
      message: 'success',
      order: newOrder,
    };
  }

  /***********************************
   * Remove order
   */
  async deletedOrder(
    userId: number,
    role: UserType,
    orderId: string,
  ): Promise<{ message: string }> {
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
    if (userId !== order.user_id && role !== UserType.ADMIN)
      throw new ForbiddenException(`Access denie`);

    await this.prismaService.orderDetail.deleteMany({
      where: { order_id: orderId },
    });

    await this.prismaService.order.delete({
      where: { id: orderId },
    });

    return { message: `Order ${orderId} deleted is successfully` };
  }

  /***********************************
   * Get order by Id
   */
  async getOrderById(
    orderId: string,
    role: UserType,
    userId: number,
  ): Promise<ISingleOrderResponse> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        order_details: {
          include: {
            product: true,
            order: false,
          },
        },
      },
    });

    // Make account is owner order or Admin account
    if (userId !== order.user_id && role !== UserType.ADMIN)
      throw new ForbiddenException(`Access denie`);

    if (!order)
      throw new NotFoundException(
        `There is no order with this id of ${orderId}`,
      );

    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        order_id: orderId,
      },
      include: {
        product: true,
      },
    });

    const products = orderDetails.map((order) => {
      return order.product.unit_price;
    });

    const totalPrice = products.reduce((prev, curr) => prev + curr, 0);

    return { totalPrice, quantity: products.length, order };
  }

  /***************************************************
   * Query owner orders by userId and response with pagination
   */
  async getOrdersByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ pagination: IPaginate; orders: IOrder[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const orders = await this.prismaService.order.findMany({
      where: {
        user_id: userId,
      },
      take: limit,
      skip: startIndex,
      orderBy: {
        id: 'asc',
      },
      include: {
        order_details: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orders || orders.length < 1) {
      throw new BadRequestException(`There is no order with id of ${userId}`);
    }

    const total = await this.prismaService.order.count({});

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

  /***************************************************
   * Query orders and response with pagination
   */
  async getOrders(
    page: number,
    limit: number,
  ): Promise<{ pagination: IPaginate; orders: IOrder[] }> {
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const total = await this.prismaService.order.count({});
    const orders = await this.prismaService.order.findMany({
      take: limit,
      skip: startIndex,
      orderBy: {
        id: 'asc',
      },
      include: {
        order_details: {
          include: {
            product: true,
          },
        },
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
