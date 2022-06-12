import { FriendService } from '../friend.service';
import { UserRepository } from 'repositories/user.repository';
import { UserDocument } from 'interfaces/User';
import { FriendRepository } from 'repositories/friend.repository';
import { FriendDocument } from 'interfaces/Friend';
import { FriendStatus } from 'config/constants/status';
import { ApiResponses } from 'config/constants/api-responses';
import { catchError } from 'utils';
import { ApiError } from 'errors/ApiError';

const userMock = {
  _id: '1',
  username: 'john',
  email: 'john@gmail.com'
} as UserDocument;

describe('CreateFriendRequest', () => {
  it('When you try to friend yourself -> Should throw ApiError', async () => {
    const mockFindUser = jest.fn(() => Promise.resolve(userMock));
    jest
      .spyOn(UserRepository.prototype, 'findOne')
      .mockImplementation(mockFindUser);
    const error = await catchError(async () =>
      FriendService.createFriendRequest({
        from: '1',
        toUsername: 'john',
        toShortId: '3332'
      })
    );
    expect(error instanceof ApiError).toEqual(true);
    expect(mockFindUser).toHaveBeenCalledTimes(1);
    expect(error.message).toEqual(ApiResponses.ERROR_CREATE_REQUEST);
  });

  it('When they are already friends -> Should throw ApiError', async () => {
    const friendRequestMock = {
      _id: '9',
      friend_status: FriendStatus.FRIEND
    } as FriendDocument;
    const mockFindUser = jest.fn(() => Promise.resolve(userMock));
    const mockCheckExistence = jest.fn(() =>
      Promise.resolve(friendRequestMock)
    );
    jest
      .spyOn(UserRepository.prototype, 'findOne')
      .mockImplementation(mockFindUser);
    jest
      .spyOn(FriendRepository.prototype, 'checkExistence')
      .mockImplementation(mockCheckExistence);
    const error = await catchError(async () =>
      FriendService.createFriendRequest({
        from: '2',
        toUsername: 'john',
        toShortId: '3332'
      })
    );
    expect(error instanceof ApiError).toEqual(true);
    expect(mockFindUser).toHaveBeenCalledTimes(1);
    expect(error.message).toEqual(ApiResponses.ALREADY_FRIENDS);
  });

  it('When request already exists -> Should throw ApiError', async () => {
    const friendRequestMock = {
      _id: '9',
      friend_status: FriendStatus.PENDING
    } as FriendDocument;
    const mockFindUser = jest.fn(() => Promise.resolve(userMock));
    const mockCheckExistence = jest.fn(() =>
      Promise.resolve(friendRequestMock)
    );
    jest
      .spyOn(UserRepository.prototype, 'findOne')
      .mockImplementation(mockFindUser);
    jest
      .spyOn(FriendRepository.prototype, 'checkExistence')
      .mockImplementation(mockCheckExistence);
    const error = await catchError(async () =>
      FriendService.createFriendRequest({
        from: '2',
        toUsername: 'john',
        toShortId: '3332'
      })
    );
    expect(error instanceof ApiError).toEqual(true);
    expect(mockFindUser).toHaveBeenCalledTimes(1);
    expect(error.message).toEqual(ApiResponses.REQUEST_ALREADY_EXISTS);
  });
});

describe('DeleteFriendRequest', () => {
  it("When try to delete a request that doesn't exist", async () => {
    const mockFindRequest = jest.fn(() => Promise.resolve(null));
    jest
      .spyOn(FriendRepository.prototype, 'findOne')
      .mockImplementation(mockFindRequest);
    const error = await catchError(async () =>
      FriendService.deleteFriendRequest('10', '1')
    );
    expect(error instanceof ApiError).toEqual(true);
    expect(mockFindRequest).toHaveBeenCalledTimes(1);
    expect(error.message).toEqual(ApiResponses.REQUEST_NOT_FOUND);
  });
});

describe('AcceptFriendRequest', () => {
  it("When try to accept a request that doesn't exist", async () => {
    const mockFindRequest = jest.fn(() => Promise.resolve(null));
    jest
      .spyOn(FriendRepository.prototype, 'findOne')
      .mockImplementation(mockFindRequest);
    const error = await catchError(async () =>
      FriendService.acceptFriendRequest('10', '1')
    );
    expect(error instanceof ApiError).toEqual(true);
    expect(mockFindRequest).toHaveBeenCalledTimes(1);
    expect(error.message).toEqual(ApiResponses.REQUEST_NOT_FOUND);
  });
});
