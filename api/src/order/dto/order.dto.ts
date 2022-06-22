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

  @IsNumberString()
  @IsNotEmpty()
  user_id: number;

  @IsNumberString({}, { each: true })
  products: number[];
}

/*******************************
 *  Update status by
 */
export class OrderUpdateStatusDto {
  @IsEnum(OrderType)
  status: OrderType;
}
