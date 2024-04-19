import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MyFriendsModule } from './my-friends/my-friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MyFriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
