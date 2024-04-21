import { Friend } from './friend';
import { Pagination, PaginationLinks } from './pagination';

export interface ApiResponse {
  data: Array<Friend>;
  meta: Pagination;
  links: PaginationLinks;
}
