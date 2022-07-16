import { IProduct } from "@/features/types";

export interface ICategory {
  id: number;
  category_name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  products: IProduct[] | null;
}
