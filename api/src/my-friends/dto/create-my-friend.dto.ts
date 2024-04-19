import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class CreateMyFriendDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  // @ApiProperty({ isArray: true })
  name: string;

  @IsString()
  @IsEnum(['female', 'male'])
  // @ApiProperty({ isArray: true })
  gender: string;
}
