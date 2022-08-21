import { IProduct, IErorrResponseData } from "@/features/interfaces";

export interface IPage {
  page: number;
  limit: number;
}

export interface IPaginate {
  total: number;
  currentPage: number;
  next: IPage;
  prev: IPage;
}

export interface ICategory {
  id: number;
  category_name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICategoryResponse {
  pagination: IPaginate;
  categories: ICategory[];
  isLoading: boolean;
  isSuccess: boolean;
  error: IErorrResponseData | null;
}
