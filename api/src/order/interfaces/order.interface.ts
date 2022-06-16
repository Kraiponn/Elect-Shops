import { OrderType } from '@prisma/client';

export interface IOrder {
  id: number;
  status: OrderType;
  address: string;
  order_date: Date;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  product_id: number;
}

export interface IOrderResponse {
  message: string;
  order: IOrder;
}
