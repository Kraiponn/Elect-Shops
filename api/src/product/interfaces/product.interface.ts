import { IImageObjResult } from 'src/features/interfaces';

export interface IProduct {
  id: number;
  productName: string;
  description: string;
  inStock: number;
  unitPrice: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatedProductResponse {
  message: string;
  product: IProduct;
}

export interface IProductResponse {
  product: IProduct;
  productImage: IImageObjResult;
}
