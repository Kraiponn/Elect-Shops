import { Product } from '@prisma/client';

export interface ICreateCategoryResponse {
  id: number;
  categoryName: string;
  description?: string;
  products?: Product[];
}
