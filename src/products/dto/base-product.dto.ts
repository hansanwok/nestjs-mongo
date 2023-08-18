import {Category} from '../../categories/schemas/category.schema'

export class BaseProductDto {
  name: string;
  imageUrl: string;
  location: string;
  price: number;
  description: string;
  category: Category;
}
