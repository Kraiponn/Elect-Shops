import { IErorrResponseData } from "@/features/types";

export interface IProduct {
  id: number;
  product_name: string;
  description: string;
  in_stock?: number;
  unit_price: number;
  image_id?: string;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
  category_id?: number;
}

export interface IProductResponse {
  current: number;
  next: {
    page: number;
    limit: number;
  };
  prev: {
    page: number;
    limit: number;
  };
  products: IProduct[];
  total: number;
}

export interface IProductSearchResponse {
  pagination: IProductResponse;
  keyword: string;
}

export interface IInputFilterProduct {
  searchKey: string;
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
}

export interface IInputCart {
  product: IProduct;
  quantity: number;
}

export interface IOrderProduct {
  product: IProduct;
  totalPrice: number;
  quantity: number;
}

export interface ICart {
  products: IProduct[];
  orders: IOrderProduct[];
  pagination: IProductResponse;
  totalPrice: number;
  quantity: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: IErorrResponseData | null;
  keyword: string;
}
