import { Order, OrderType, Product } from '@prisma/client';

export interface IOrderDetail {
  id?: number;
  product_id?: number;
  products?: Product;
  order_id?: string;
  order?: Order;
  created_at?: Date;
  updated_at?: Date;
}

export interface IOrder {
  id: string;
  status: OrderType;
  address: string;
  order_date: Date;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  order_details: IOrderDetail[];
}

export interface IOrderResponse {
  message: string;
  order: IOrder;
}

export interface ISingleOrderResponse {
  totalPrice: number;
  quantity: number;
  order: IOrder;
}
