// import { Test, TestingModule } from '@nestjs/testing';
// import { MyFriendsController } from './my-friends.controller';
// import { MyFriendsService } from './my-friends.service';
// import { CreateMyFriendDto } from './dto/create-my-friend.dto';
// import { MyFriend } from './entities/my-friend.entity';
// import { UpdateMyFriendDto } from './dto/update-my-friend.dto';

// describe('MyFriendsController', () => {
//   let controller: MyFriendsController;

//   const mockMyFriendsService = {
//     create: jest.fn(),
//     findAll: jest.fn(),
//     findOne: jest.fn(),
//     update: jest.fn(),
//     remove: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MyFriendsController],
//       providers: [
//         {
//           provide: MyFriendsService,
//           useValue: mockMyFriendsService,
//         },
//       ],
//     }).compile();

//     controller = module.get<MyFriendsController>(MyFriendsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   //   it('create => should create a new user by a given data', async () => {
//   //     // arrange
//   //     const createMyFriendDto = {
//   //       name: 'Cristian',
//   //       gender: 'male',
//   //     } as CreateMyFriendDto;

//   //     const myFriend = {
//   //       id: 1,
//   //       name: 'Cristian',
//   //       gender: 'female',
//   //     } as MyFriend;

//   //     jest.spyOn(mockMyFriendsService, 'create').mockReturnValue(myFriend);

//   //     // act
//   //     const result = await controller.create(createMyFriendDto);

//   //     // assert
//   //     expect(mockMyFriendsService.create).toHaveBeenCalledWith(createMyFriendDto);

//   //     expect(result).toEqual(myFriend);
//   //   });

//   //   it('findAll => should return an array of myFriends', async () => {
//   //     //arrange
//   //     const myFriend = {
//   //       id: 1,
//   //       name: 'Cristian',
//   //       gender: 'male',
//   //     };
//   //     const myFriends = [myFriend];
//   //     jest.spyOn(mockMyFriendsService, 'findAll').mockReturnValue(myFriends);

//   //     //act
//   //     const result = await controller.findAll();

//   //     // assert
//   //     expect(result).toEqual(myFriends);
//   //     expect(mockMyFriendsService.findAll).toHaveBeenCalled();
//   //   });

//   //   it('findOne => should find a myFriend by a given id and return its data', async () => {
//   //     //arrange
//   //     const id = 1;
//   //     const myFriend = {
//   //       id: 1,
//   //       name: 'Cristian',
//   //       gender: 'male',
//   //     };

//   //     jest.spyOn(mockMyFriendsService, 'findOne').mockReturnValue(myFriend);

//   //     //act
//   //     const result = await controller.findOne(id);

//   //     expect(result).toEqual(myFriend);
//   //     expect(mockMyFriendsService.findOne).toHaveBeenCalledWith(id);
//   //   });

//   //   it('update => should find a myFriend by a given id and update its data', async () => {
//   //     //arrange
//   //     const id = 1;
//   //     const updateMyFriendDto = {
//   //       name: 'Cristian',
//   //       gender: 'male',
//   //     } as UpdateMyFriendDto;

//   //     const user = {
//   //       id: 1,
//   //       name: 'Cristian',
//   //       gender: 'male',
//   //     };

//   //     jest.spyOn(mockMyFriendsService, 'update').mockReturnValue(user);

//   //     //act
//   //     const result = await controller.update(id, updateMyFriendDto);

//   //     expect(result).toEqual(user);
//   //     expect(mockMyFriendsService.update).toHaveBeenCalledWith(
//   //       id,
//   //       updateMyFriendDto,
//   //     );
//   //   });

//   //   it('remove => should find a myFriend by a given id and remove', async () => {
//   //     const id = 1;

//   //     const myFriend = {
//   //       id: 1,
//   //       name: 'Cristian',
//   //       gender: 'male',
//   //     };

//   //     jest.spyOn(mockMyFriendsService, 'remove').mockReturnValue(myFriend);

//   //     //act
//   //     const result = await controller.remove(id);

//   //     expect(result).toEqual(myFriend);
//   //     expect(mockMyFriendsService.remove).toHaveBeenCalledWith(id);
//   //   });
// });
