import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class AdminUpdatePwdDto {
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
        'New password to week or must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
  )
  password: string;
}
