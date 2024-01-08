import { IsUrl, IsNotEmpty, IsNumber } from 'class-validator';

export class PhotoDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
