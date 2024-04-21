import { Test, TestingModule } from '@nestjs/testing';
import { MyFriendsController } from './my-friends.controller';
import { MyFriendsService } from './my-friends.service';
import { CreateMyFriendDto } from './dto/create-my-friend.dto';
import { MyFriend } from './entities/my-friend.entity';
import { UpdateMyFriendDto } from './dto/update-my-friend.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('MyFriendsController', () => {
  let controller: MyFriendsController;

  const mockMyFriendsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const myFriend = {
    id: 1,
    name: 'Cristian',
    gender: 'female',
  } as MyFriend;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyFriendsController],
      providers: [
        {
          provide: MyFriendsService,
          useValue: mockMyFriendsService,
        },
      ],
    }).compile();

    controller = module.get<MyFriendsController>(MyFriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user by a given data', async () => {
      // arrange
      const createMyFriendDto = {
        name: 'Cristian',
        gender: 'male',
      } as CreateMyFriendDto;

      jest.spyOn(mockMyFriendsService, 'create').mockReturnValue(myFriend);

      // act
      const result = await controller.create(createMyFriendDto);

      // assert
      expect(mockMyFriendsService.create).toHaveBeenCalledWith(
        createMyFriendDto,
      );

      expect(result).toEqual(myFriend);
    });

    it('should catch errors if something wrong happens creating a new friend', async () => {
      // arrange
      const createMyFriendDto = {
        name: 'Cristian',
        gender: 'male',
      } as CreateMyFriendDto;

      jest.spyOn(mockMyFriendsService, 'create').mockReturnValue(new Error());

      // act
      try {
        await controller.create(createMyFriendDto);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of myFriends', async () => {
      //arrange
      const myFriends = [myFriend];
      jest.spyOn(mockMyFriendsService, 'findAll').mockReturnValue(myFriends);

      //act
      const result = await controller.findAll();

      // assert
      expect(result).toEqual(myFriends);
      expect(mockMyFriendsService.findAll).toHaveBeenCalled();
    });

    it('should catch errors if something wrong happens listing all friends', async () => {
      jest.spyOn(mockMyFriendsService, 'findAll').mockReturnValue(new Error());

      // act
      try {
        await controller.findAll();
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findOne', () => {
    it('should find a myFriend by a given id and return its data', async () => {
      //arrange
      const id = 1;

      jest.spyOn(mockMyFriendsService, 'findOne').mockReturnValue(myFriend);

      //act
      const result = await controller.findOne(id);

      expect(result).toEqual(myFriend);
      expect(mockMyFriendsService.findOne).toHaveBeenCalledWith(id);
    });

    it('should catch errors if something wrong happens finding a friend by id', async () => {
      // arrange
      const id = 1;

      jest.spyOn(mockMyFriendsService, 'findOne').mockReturnValue(new Error());

      // act
      try {
        await controller.findOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('update', () => {
    it('should find a myFriend by a given id and update its data', async () => {
      //arrange
      const id = 1;
      const updateMyFriendDto = {
        name: 'Cristian',
        gender: 'male',
      } as UpdateMyFriendDto;

      jest.spyOn(mockMyFriendsService, 'update').mockReturnValue(myFriend);

      //act
      const result = await controller.update(id, updateMyFriendDto);

      expect(result).toEqual(myFriend);
      expect(mockMyFriendsService.update).toHaveBeenCalledWith(
        id,
        updateMyFriendDto,
      );
    });

    it('should catch errors if something wrong happens updating a friend', async () => {
      // arrange
      const id = 1;
      const updateMyFriendDto = {
        name: 'Cristian',
        gender: 'male',
      } as UpdateMyFriendDto;

      jest.spyOn(mockMyFriendsService, 'update').mockReturnValue(new Error());

      // act
      try {
        await controller.update(id, updateMyFriendDto);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('remove', () => {
    it('should find a myFriend by a given id and remove', async () => {
      const id = 1;

      jest.spyOn(mockMyFriendsService, 'remove').mockReturnValue(myFriend);

      //act
      const result = await controller.remove(id);

      expect(result).toEqual(myFriend);
      expect(mockMyFriendsService.remove).toHaveBeenCalledWith(id);
    });

    it('should catch errors if something wrong happens removing a friend', async () => {
      // arrange
      const id = 1;

      jest.spyOn(mockMyFriendsService, 'remove').mockReturnValue(new Error());

      // act
      try {
        await controller.remove(id);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
