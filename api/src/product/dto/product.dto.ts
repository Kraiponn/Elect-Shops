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
  productName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNumberString()
  inStock?: number;

  @IsOptional()
  @IsNumberString()
  unitPrice?: number;

  @IsOptional()
  @IsNumberString()
  categoryId?: number;
}
