import { Sort } from '../types/sort';

export interface Pagination {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  sortBy: [[string, Sort]];
}

export interface PaginationLinks {
  current: string;
  next: string;
  last: string;
}
