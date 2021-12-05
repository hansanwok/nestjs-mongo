import { IsNotEmpty } from 'class-validator';

import { BaseCatDto } from "./base-cat.dto";
export class CreateCatDto extends BaseCatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  breed: string;
}
