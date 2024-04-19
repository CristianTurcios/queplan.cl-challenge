import { PartialType } from '@nestjs/mapped-types';
import { CreateMyFriendDto } from './create-my-friend.dto';

export class UpdateMyFriendDto extends PartialType(CreateMyFriendDto) {}
