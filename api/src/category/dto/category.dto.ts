import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
