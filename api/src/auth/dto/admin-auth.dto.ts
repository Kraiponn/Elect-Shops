import { UserType } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatedUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  /******************************
      Min 1 uppercase letter.
      Min 1 lowercase letter.
      Min 1 special character.
      Min 1 number.
      Min 6 characters.
      Max 30 characters.
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Matches(
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{5,}$/,
    {
      message:
        'Password to week and must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
  )
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsEnum(UserType)
  role?: UserType;

  // Reference with cloudinary: public_id
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_id?: string;

  // Reference with cloudinary: secure_url
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_url?: string;
}
