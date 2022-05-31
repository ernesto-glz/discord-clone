import { FriendStatus } from 'config/constants/friend-status';
import { FriendDocument } from 'interfaces/Friend';
import { Friend } from 'models/friend.model';
import { Repository } from './Base';

export class FriendRepository extends Repository<FriendDocument> {
  constructor() {
    super(Friend);
  }

  async checkExistence(fromId: string, userId: string) {
    return await this.findOne({
      $or: [
        { $and: [{ from: userId }, { to: fromId }] },
        { $and: [{ from: fromId }, { to: userId }] }
      ]
    });
  }

  async getPendingRequests(to: string) {
    return await this.find({
      to,
      friend_status: FriendStatus.PENDING
    });
  }

  async getOutgoingRequests(from: string) {
    return await this.find({
      from,
      friend_status: FriendStatus.PENDING
    });
  }

  async getFriends(userId: string) {
    return await this.findAndPopulate(
      {
        $or: [{ from: userId }, { to: userId }],
        friend_status: FriendStatus.FRIEND
      },
      'from',
      'to'
    );
  }

  async acceptFriendRequest(requestId: string) {
    return await this.updateOne(
      { _id: requestId },
      { friend_status: FriendStatus.FRIEND }
    );
  }
}
