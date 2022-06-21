import { OrderType } from '@prisma/client';
import {
  IsArray,
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

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsNumber({}, { each: true })
  // @IsOptional()
  // @Type(() => Number)
  @IsNumberString({}, { each: true })
  products: number[];
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
  @IsNumberString({}, { each: true })
  products?: number[];
}
