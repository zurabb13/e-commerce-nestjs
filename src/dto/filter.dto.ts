import { Category } from '../Schema/category.schema';

export class FilterProductDto {
  search: typeof Category;
  category: string;
}
