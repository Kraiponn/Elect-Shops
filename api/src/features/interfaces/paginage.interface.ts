export interface INextPage {
  page: number;
  limit: number;
}

export interface IPreviousPage {
  page: number;
  limit: number;
}

export interface IPaginate {
  total: number;
  current: number;
  next: INextPage;
  prev: IPreviousPage;
}
