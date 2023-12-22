export interface PaginatedData<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface QueryFilter {
  [key: string]: any;
}

export interface QueryOptions {
  sortBy?: string;
  populate?: string;
  limit?: number;
  page?: number;
}
