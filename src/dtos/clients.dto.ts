import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, Matches, ArrayMinSize, IsArray } from 'class-validator';

export class CreateClientDto {
  @MinLength(2)
  @MaxLength(25)
  @IsString()
  public firstName: string;

  @MinLength(2)
  @MaxLength(25)
  @IsString()
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  public password: string;

  @IsString()
  @IsNotEmpty()
  public role: string;

  @IsArray()
  @ArrayMinSize(4)
  public photos: string[];
}
