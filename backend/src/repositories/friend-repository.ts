import { FriendStatus } from 'config/constants/status';
import { FriendDocument } from 'interfaces/Friend';
import { Friend } from 'models/friend';
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
    return await this.findAndPopulate(
      {
        to,
        friend_status: FriendStatus.PENDING
      },
      'from',
      'to'
    );
  }

  async getOutgoingRequests(from: string) {
    return await this.findAndPopulate(
      {
        from,
        friend_status: FriendStatus.PENDING
      },
      'from',
      'to'
    );
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
    return await this.updateOne({ _id: requestId }, { friend_status: FriendStatus.FRIEND });
  }
}
