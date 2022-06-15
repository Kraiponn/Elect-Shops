export interface IProduct {
  id: number;
  product_name: string;
  description?: string;
  in_stock: number;
  unit_price: number;
  image_id?: string;
  image_url?: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IProductResponse {
  message: string;
  product: IProduct;
}
