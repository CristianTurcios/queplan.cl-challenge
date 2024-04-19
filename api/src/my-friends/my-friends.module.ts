import { Module } from '@nestjs/common';
import { MyFriendsService } from './services/my-friends.service';
import { MyFriendsController } from './controllers/my-friends.controller';
import { MyFriend } from './entities/my-friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MyFriend])], // add this line
  controllers: [MyFriendsController],
  providers: [MyFriendsService],
})
export class MyFriendsModule {}
