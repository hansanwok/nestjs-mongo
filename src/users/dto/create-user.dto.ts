import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  dateOfBirth: Date;

  @IsOptional()
  avatarUrl: string;
}
