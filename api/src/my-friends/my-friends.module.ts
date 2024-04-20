import { Module } from '@nestjs/common';
import { MyFriendsService } from './my-friends.service';
import { MyFriendsController } from './my-friends.controller';
import { MyFriend } from './entities/my-friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MyFriend])],
  controllers: [MyFriendsController],
  providers: [MyFriendsService],
})
export class MyFriendsModule {}
