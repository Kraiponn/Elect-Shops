import { OrderType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

/*******************************
 *  Create DTO
 */
export class OrderCreatedDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  @IsNotEmpty()
  order_date: Date;

  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  product_id: number;
}

/*******************************
 *  Update DTO
 */
export class OrderUpdatedDto {
  @IsOptional()
  @IsEnum(OrderType)
  status?: OrderType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  order_date?: Date;

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  user_id?: number;

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  product_id?: number;
}
