import { FriendStatus } from 'config/constants/friend-status';
import { ApiError } from 'errors/ApiError';
import { CreateFriendRequest } from 'interfaces/Friend';
import { FriendRepository } from 'repositories/friend.repository';
import { UserRepository } from 'repositories/user.repository';
import { ApiResponses } from 'config/constants/api-responses';

export class FriendService {
  private static userRepository = new UserRepository();
  private static friendRepository = new FriendRepository();

  static async createFriendRequest({ from, toUsername, toShortId }: CreateFriendRequest) {
    const userFound = await this.userRepository.findOne({
      username: toUsername,
      shortId: toShortId
    });

    if (!userFound) {
      throw new ApiError(400, ApiResponses.ERROR_CREATE_REQUEST);
    }

    if (userFound._id.toString() === from.toString()) {
      throw new ApiError(400, ApiResponses.ERROR_CREATE_REQUEST);
    }

    const alreadyRequest = await this.friendRepository.checkExistence(from, userFound._id);

    if (alreadyRequest) {
      if (alreadyRequest.friend_status === FriendStatus.FRIEND) {
        throw new ApiError(400, ApiResponses.ALREADY_FRIENDS);
      }
      throw new ApiError(400, ApiResponses.REQUEST_ALREADY_EXISTS);
    }

    return await this.friendRepository.create({
      from,
      to: userFound._id
    });
  }

  static async getPendingRequests(userId: string) {
    return await this.friendRepository.getPendingRequests(userId);
  }

  static async getOutgoingRequests(userId: string) {
    return await this.friendRepository.getOutgoingRequests(userId);
  }

  static async deleteFriendRequest(requestId: string, userId: string) {
    const requestExists = await this.friendRepository.findOne({
      _id: requestId,
      $or: [{ to: userId }, { from: userId }]
    });

    if (!requestExists) {
      throw new ApiError(400, ApiResponses.REQUEST_NOT_FOUND);
    }

    return await this.friendRepository.findByIdAndDelete(requestId);
  }

  static async acceptFriendRequest(requestId: string, userId: string) {
    const requestExists = await this.friendRepository.findOne({
      _id: requestId,
      to: userId
    });

    if (!requestExists) {
      throw new ApiError(400, ApiResponses.REQUEST_NOT_FOUND);
    }

    return await this.friendRepository.acceptFriendRequest(requestId);
  }

  static async getFriends(userId: string) {
    return await this.friendRepository.getFriends(userId);
  }
}
