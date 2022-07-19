import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

/**************************************
 * Create DTO
 */
export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  in_stock: number;

  @IsNumberString()
  @IsNotEmpty()
  unit_price: number;
}

/**************************************
 * Update DTO
 */
export class ProductUpdateDto {
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
