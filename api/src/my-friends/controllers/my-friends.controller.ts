import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MyFriendsService } from '../services/my-friends.service';
import { CreateMyFriendDto } from '../dto/create-my-friend.dto';
import { UpdateMyFriendDto } from '../dto/update-my-friend.dto';
import { ApiTags } from '@nestjs/swagger';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@Controller('my-friends')
@ApiTags('My-Friends')
export class MyFriendsController {
  constructor(private readonly myFriendsService: MyFriendsService) {}

  @Post()
  create(@Body() createMyFriendDto: CreateMyFriendDto) {
    return this.myFriendsService.create(createMyFriendDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(CreateMyFriendDto)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateMyFriendDto>> {
    return this.myFriendsService.findAll(pageOptionsDto);
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
