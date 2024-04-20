import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
import { ApiPaginatedResponse } from 'src/common/decorator/api-pagination.response';
import { MyFriend } from './entities/my-friend.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('my-friends')
@Controller('my-friends')
@ApiTags('My-Friends')
export class MyFriendsController {
  constructor(private readonly myFriendsService: MyFriendsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateMyFriendDto,
    description: 'Json structure for friend object',
  })
  create(@Body() createMyFriendDto: CreateMyFriendDto) {
    return this.myFriendsService.create(createMyFriendDto);
  }

  @Get()
  @ApiPaginatedResponse({ model: MyFriend, description: 'List of friends' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<MyFriend>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return this.myFriendsService.findAll(options);
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
