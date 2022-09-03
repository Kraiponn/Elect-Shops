import { ECategory } from "@/features/const/enum";
import { IErorrResponseData } from "@/features/interfaces";

export interface IInputCategory {
  id?: number;
  category_name: string;
  description: string;
}

export interface ICategory {
  id: number;
  category_name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ISingleCategoryResponse extends IInputCategory {}

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

export interface ISearchCategory {
  page: number;
  limit: number;
  noPrefixZeroIndex: boolean;
  searchKey: string;
}

export interface ICategoryResponse {
  pagination: IPaginate;
  dataPerPage: number;
  currentPage: number;
  categories: ICategory[];
  isLoading: boolean;
  isSuccess: boolean;
  error: IErorrResponseData | null;
  processType: ECategory;
}

export interface ICUCategoryResponse extends IInputCategory {}
