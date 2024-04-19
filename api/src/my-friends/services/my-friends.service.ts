import { CreateMyFriendDto } from '../dto/create-my-friend.dto';
import { UpdateMyFriendDto } from '../dto/update-my-friend.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyFriend } from '../entities/my-friend.entity';
import { Repository } from 'typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../common/dtos';

@Injectable()
export class MyFriendsService {
  constructor(
    @InjectRepository(MyFriend) private userRepository: Repository<MyFriend>,
  ) {}

  async create(createMyFriendDto: CreateMyFriendDto): Promise<MyFriend> {
    const user = new MyFriend();
    user.gender = createMyFriendDto.gender;
    user.name = createMyFriendDto.name;
    return await this.userRepository.save(user);
  }

  createPaginationLinks = (
    page,
    limit,
    total,
  ): {
    first: string;
    prev: string;
    next: string;
    last: string;
  } => {
    const totalPages = Math.ceil(total / limit);
    return {
      first: `/my-friends?page=1&limit=${limit}`,
      prev: page > 1 ? `/my-friends?page=${page - 1}&limit=${limit}` : null,
      next:
        page < totalPages
          ? `/my-friends?page=${page + 1}&limit=${limit}`
          : null,
      last: `/my-friends?page=${totalPages}&limit=${limit}`,
    };
  };

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MyFriend>> {
    const queryBuilder = this.userRepository.createQueryBuilder('my_friends');

    queryBuilder
      .orderBy('my_friends.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<MyFriend> {
    const queryBuilder = this.userRepository.createQueryBuilder('my_friends');
    queryBuilder.where('my_friends.id = :id', { id });
    return queryBuilder.getOne();
  }

  async update(
    id: number,
    updateMyFriendDto: UpdateMyFriendDto,
  ): Promise<MyFriend> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, updateMyFriendDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
