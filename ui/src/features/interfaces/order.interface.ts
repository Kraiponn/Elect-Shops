import { IProduct, IErorrResponseData } from "@/features/interfaces";

export interface IInputOrder {
  products: string[];
  address: string;
  //   userOrder: IProfile;
}

export interface IOrderDetail {
  id: number;
  product_id?: number;
  products: IProduct[];
  order_id: string;
  //   order: Order;
  created_at?: Date;
  updated_at?: Date;
}

export interface IOrder {
  id: string;
  status: "WAITING" | "PENDING" | "ON_WAY" | "SHIPPING";
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

export interface IOrderState {
  isLoading: boolean;
  isSuccess: boolean;
  error: IErorrResponseData | null;
}
