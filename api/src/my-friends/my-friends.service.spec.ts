import { Test, TestingModule } from '@nestjs/testing';
import { MyFriendsService } from './my-friends.service';

describe('MyFriendsService', () => {
  let service: MyFriendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyFriendsService],
    }).compile();

    service = module.get<MyFriendsService>(MyFriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
