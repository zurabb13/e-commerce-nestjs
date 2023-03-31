import { Category } from '../Schema/category.schema';

export class FilterProductDto {
  search: string;
  category: typeof Category;
}
