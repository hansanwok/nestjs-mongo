import { IsNotEmpty } from 'class-validator';

import {BaseCategoryDto} from './base-category.dto'

export class CreateCategoryDto extends BaseCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imageUrl: string;
}
