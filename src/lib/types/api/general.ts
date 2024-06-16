export interface IDate {
  day: number;
  hour: number;
  minute: number;
  month: number;
  second: number;
  year: number;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
}

export interface IPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: ISort;
}

export interface IResponse<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  size: number;
  sort: ISort;
  pageable: IPageable;
}
