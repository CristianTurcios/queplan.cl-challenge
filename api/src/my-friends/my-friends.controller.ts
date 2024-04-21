import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
import { MyFriend } from './entities/my-friend.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@ApiTags('my-friends')
@Controller('my-friends')
export class MyFriendsController {
  constructor(private readonly myFriendsService: MyFriendsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: CreateMyFriendDto,
    description: 'Json structure for friend object',
  })
  async create(@Body() createMyFriendDto: CreateMyFriendDto) {
    return await this.myFriendsService.create(createMyFriendDto);
  }

  // @Get()
  // @ApiPaginatedResponse({ model: MyFriend, description: 'List of friends' })
  // findAll(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  // ): Promise<Pagination<MyFriend>> {
  //   const options: IPaginationOptions = {
  //     limit,
  //     page,
  //     route: '/my-friends',
  //   };
  //   return this.myFriendsService.findAll(options);
  // }

  @Get('/all')
  findAll(): Promise<MyFriend[]> {
    return this.myFriendsService.findAll();
  }

  @Get()
  paginated(@Paginate() query: PaginateQuery): Promise<Paginated<MyFriend>> {
    return this.myFriendsService.paginated(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.myFriendsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: UpdateMyFriendDto,
    description: 'Json structure for update friend object',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMyFriendDto: UpdateMyFriendDto,
  ) {
    return this.myFriendsService.update(id, updateMyFriendDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.myFriendsService.remove(id);
  }
}
