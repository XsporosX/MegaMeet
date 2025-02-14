import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength} from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MaxLength(15)
  password: string;
}
