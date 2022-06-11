export interface IPaginateNextPage {
  page: number;
  limit: number;
}

export interface IPaginatePreviousPage {
  page: number;
  limit: number;
}

export interface IPaginate {
  total: number;
  current: number;
  next: IPaginateNextPage;
  prev: IPaginatePreviousPage;
}
