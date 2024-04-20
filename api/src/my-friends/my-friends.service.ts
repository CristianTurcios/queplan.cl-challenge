import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyFriend } from './entities/my-friend.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

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

  async findAll(options: IPaginationOptions): Promise<Pagination<MyFriend>> {
    const qb = this.userRepository.createQueryBuilder('my_friends');
    qb.orderBy('my_friends.id', 'DESC');

    return paginate<MyFriend>(qb, options);

    // return await this.userRepository.find();
  }

  async findOne(id: number): Promise<MyFriend> {
    return await this.userRepository.findOne({ where: { id } });
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
