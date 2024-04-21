import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export class CreateMyFriendDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Cristian',
    required: true,
  })
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'numbers or symbols are not allowed' })
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'male',
    required: true,
  })
  @IsString()
  @IsEnum(['female', 'male'], {
    message: 'Gender must be one of the following values: male or female',
  })
  @IsNotEmpty()
  gender: string;
}
