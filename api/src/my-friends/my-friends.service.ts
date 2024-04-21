import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyFriend } from './entities/my-friend.entity';
import { Repository } from 'typeorm';
// import {
//   IPaginationOptions,
//   paginate,
//   Pagination,
// } from 'nestjs-typeorm-paginate';

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

  // async findAll(options: IPaginationOptions): Promise<Pagination<MyFriend>> {
  //   const qb = this.userRepository.createQueryBuilder('my_friends');
  //   qb.orderBy('my_friends.id', 'ASC');

  //   return paginate<MyFriend>(qb, options);
  // }

  async findAll(): Promise<MyFriend[]> {
    const qb = this.userRepository
      .createQueryBuilder('my_friends')
      .orderBy('my_friends.id', 'ASC')
      .getMany();

    return qb;
  }

  async findOne(id: number): Promise<MyFriend> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
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
    return { ...user, ...updateMyFriendDto };
  }

  async remove(id: number): Promise<MyFriend> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return user;
  }
}
