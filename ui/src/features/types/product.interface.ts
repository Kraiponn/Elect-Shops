export interface ICategory {
  id: number;
  category_name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  products?: IProduct[] | null;
}

export interface IProduct {
  id?: number;
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

export interface ICart {
  totalPrice: number;
  products: IProduct[] | null;
  amount: number;
}
