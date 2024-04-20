import { Friend } from './friend';
import { Pagination, PaginationLinks } from './pagination';

export interface ApiResponse {
  items: Array<Friend>;
  meta: Pagination;
  links: PaginationLinks;
}
