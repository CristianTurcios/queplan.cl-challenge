import { Test, TestingModule } from '@nestjs/testing';
import { MyFriendsService } from './my-friends.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MyFriend } from './entities/my-friend.entity';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { NotFoundException } from '@nestjs/common';

describe('MyFriendsService', () => {
  let service: MyFriendsService;

  const mockMyFriendRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValueOnce([
        {
          id: 1,
          name: 'Cristian',
          gender: 'male',
        },
      ]),
    })),
  };

  const myFriend = {
    id: 1,
    name: 'Cristian',
    gender: 'male',
  } as MyFriend;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyFriendsService,
        {
          provide: getRepositoryToken(MyFriend),
          useValue: mockMyFriendRepository,
        },
      ],
    }).compile();

    service = module.get<MyFriendsService>(MyFriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new friend and return its data', async () => {
      // arrange
      const createMyFriendDto = {
        name: 'Cristian',
        gender: 'male',
      } as CreateMyFriendDto;

      jest.spyOn(mockMyFriendRepository, 'save').mockReturnValue(myFriend);

      // act
      const result = await service.create(createMyFriendDto);

      // assert
      expect(mockMyFriendRepository.save).toHaveBeenCalledWith(
        createMyFriendDto,
      );
      expect(result).toEqual(myFriend);
    });
  });

  describe('findAll', () => {
    it('should return an array of friends', async () => {
      //arrange
      const myFriends = [myFriend];

      //act
      const result = await service.findAll();

      // assert
      expect(result).toEqual(myFriends);
    });
  });

  describe('findOne', () => {
    it('should find a friend by a given id and return its data', async () => {
      //arrange
      const id = 1;

      jest.spyOn(mockMyFriendRepository, 'findOne').mockReturnValue(myFriend);

      //act
      const result = await service.findOne(id);

      //assert
      expect(result).toEqual(myFriend);
      expect(mockMyFriendRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an error if friend does not exist', async () => {
      const id = 1;
      jest.spyOn(mockMyFriendRepository, 'findOne').mockReturnValue(null);

      try {
        await service.remove(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }
    });
  });

  describe('update', () => {
    it('should find a friend by a given id and update the user data', async () => {
      //arrange
      const id = 1;

      jest.spyOn(mockMyFriendRepository, 'findOne').mockReturnValue(myFriend);

      //act
      const result = await service.update(id, {
        name: 'Javier',
        gender: 'male',
      });

      myFriend.name = 'Javier';

      //assert
      expect(result.name).toEqual('Javier');
      expect(mockMyFriendRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockMyFriendRepository.update).toHaveBeenCalled();
    });

    it('should throw an error if friend does not exist', async () => {
      const id = 1;
      jest.spyOn(mockMyFriendRepository, 'findOne').mockReturnValue(null);

      try {
        await service.remove(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }
    });
  });

  describe('remove', () => {
    it('should find a friend by a given id, remove and then return affected friend data', async () => {
      const id = 1;
      jest.spyOn(mockMyFriendRepository, 'findOne').mockReturnValue(myFriend);
      jest.spyOn(mockMyFriendRepository, 'delete');

      //act
      const result = await service.remove(id);

      expect(result).toEqual(myFriend);
      expect(mockMyFriendRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if friend does not exist', async () => {
      const id = 1;
      jest.spyOn(mockMyFriendRepository, 'delete').mockReturnValue(null);

      try {
        await service.remove(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }
    });
  });
});
