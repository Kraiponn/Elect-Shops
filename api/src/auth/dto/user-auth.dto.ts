import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatedProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  // @Matches(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
  //   message: 'Phone number is incorrect',
  // })
  phone?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;
}

export class UserUpdatedPwdDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  /******************************
      Min 1 uppercase letter.
      Min 1 lowercase letter.
      Min 1 special character.
      Min 1 number.
      Min 6 characters.
      Max 30 characters.
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/,
    {
      message:
        'New password to week or must contains at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
  )
  newPassword: string;
}
