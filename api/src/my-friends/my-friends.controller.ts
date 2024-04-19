import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';

@Controller('my-friends')
export class MyFriendsController {
  constructor(private readonly myFriendsService: MyFriendsService) {}

  @Post()
  create(@Body() createMyFriendDto: CreateMyFriendDto) {
    return this.myFriendsService.create(createMyFriendDto);
  }

  @Get()
  findAll() {
    return this.myFriendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myFriendsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMyFriendDto: UpdateMyFriendDto,
  ) {
    return this.myFriendsService.update(+id, updateMyFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myFriendsService.remove(+id);
  }
}
