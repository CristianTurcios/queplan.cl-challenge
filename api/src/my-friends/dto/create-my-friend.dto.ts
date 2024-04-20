import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateMyFriendDto {
  @ApiProperty({
    example: 'Cristian',
    required: true,
  })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'male',
    required: true,
  })
  @IsString()
  @IsEnum(['female', 'male'])
  @IsNotEmpty()
  gender: string;
}
