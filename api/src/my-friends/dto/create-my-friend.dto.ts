import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMyFriendDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(['female', 'male'])
  gender: string;
}
