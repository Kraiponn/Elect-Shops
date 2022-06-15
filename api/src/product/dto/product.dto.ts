import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  product_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumberString()
  in_stock?: number;

  @IsOptional()
  @IsNumberString()
  unit_price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_url?: string;

  @IsOptional()
  @IsNumberString()
  category_id?: number;
}
