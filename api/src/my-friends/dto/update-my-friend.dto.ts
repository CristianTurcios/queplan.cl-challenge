import { PickType } from '@nestjs/mapped-types';
import { CreateMyFriendDto } from './create-my-friend.dto';

export class UpdateMyFriendDto extends PickType(CreateMyFriendDto, [
  'name',
  'gender',
] as const) {}
