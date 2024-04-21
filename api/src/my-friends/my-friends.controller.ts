import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
import { MyFriend } from './entities/my-friend.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Paginate,
  PaginateQuery,
  Paginated,
  PaginatedSwaggerDocs,
} from 'nestjs-paginate';
import { SortableColumns } from '../common/enums/sortableColumns';
import { SearchableColumns } from '../common/enums/searchableColumns';

@ApiTags('my-friends')
@Controller('my-friends')
export class MyFriendsController {
  constructor(private readonly myFriendsService: MyFriendsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a Friend in records',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateMyFriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBody({
    type: CreateMyFriendDto,
    description: 'Json structure for friend object',
  })
  async create(@Body() createMyFriendDto: CreateMyFriendDto) {
    try {
      return await this.myFriendsService.create(createMyFriendDto);
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong.', {
        cause: new Error(),
      });
    }
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Get plain friends without pagination metadata',
  })
  @ApiOkResponse({
    description: 'Friends Records',
    type: CreateMyFriendDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  findAll(): Promise<MyFriend[]> {
    try {
      return this.myFriendsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong.', {
        cause: new Error(),
      });
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get friends with additional metadata for pagination',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @PaginatedSwaggerDocs(CreateMyFriendDto, {
    sortableColumns: [
      SortableColumns.ID,
      SortableColumns.Name,
      SortableColumns.Gender,
    ],
    searchableColumns: [SearchableColumns.Name, SearchableColumns.Gender],
  })
  paginated(@Paginate() query: PaginateQuery): Promise<Paginated<MyFriend>> {
    try {
      return this.myFriendsService.paginated(query);
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong.', {
        cause: new Error(),
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a friend in records by specific id',
  })
  @ApiOkResponse({
    description: 'Friend Record',
    type: CreateMyFriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Friend not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.myFriendsService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong.', {
        cause: new Error(),
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a specific property for a friend in records',
  })
  @ApiOkResponse({
    description: 'Friend Record',
    type: CreateMyFriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Friend not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBody({
    type: UpdateMyFriendDto,
    description: 'Json structure for update friend object',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMyFriendDto: UpdateMyFriendDto,
  ) {
    try {
      return this.myFriendsService.update(id, updateMyFriendDto);
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong.', {
        cause: new Error(),
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a friend from records' })
  @ApiOkResponse({
    description: 'Friend Record',
    type: CreateMyFriendDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Friend not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.myFriendsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong.', {
        cause: new Error(),
      });
    }
  }
}
