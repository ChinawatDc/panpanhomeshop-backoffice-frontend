// types/common/pagination.ts
export interface PageInformation {
  count: number;
  last_page: number;
  page: number;
  size: number;
}

export interface PaginatedResponse<T> {
  entities: T[];
  page_information: PageInformation;
}
