import {Category} from '../../categories/schemas/category.schema'

import { IsNotEmpty, IsOptional } from 'class-validator';

import { BaseProductDto } from './base-product.dto'

export class CreateProductDto extends BaseProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  location: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: Category;
}
