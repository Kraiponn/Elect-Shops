import { Product } from '@prisma/client';

export interface ICategory {
  id: number;
  category_name: string;
  description?: string;
  products?: Product[];
}
