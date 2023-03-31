import { Category } from '../Schema/category.schema';

export class ProductDto {
  name: string;
  description: string;
  price: number;
  category: typeof Category;
}
