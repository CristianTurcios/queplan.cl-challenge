import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Query,
  // DefaultValuePipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
// import { ApiPaginatedResponse } from 'src/common/decorator/api-pagination.response';
import { MyFriend } from './entities/my-friend.entity';
// import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    return await this.myFriendsService
      .create(createMyFriendDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message },
          HttpStatus.BAD_REQUEST,
        );
      });
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

  @Get()
  findAll(): Promise<MyFriend[]> {
    return this.myFriendsService.findAll();
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
