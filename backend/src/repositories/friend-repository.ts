import { FriendStatus } from 'config/constants/status';
import { FriendDocument } from 'interfaces/Friend';
import { Friend } from 'models/friend';
import { flattenUser } from 'utils';
import { Repository } from './Base';

export class FriendRepository extends Repository<FriendDocument> {
  constructor() {
    super(Friend);
  }

  async checkExistence(fromId: string, userId: string) {
    return await this.findOne({
      $or: [{ $and: [{ from: userId }, { to: fromId }] }, { $and: [{ from: fromId }, { to: userId }] }]
    });
  }

  async getPendingRequests(to: string) {
    return await this.findAndPopulate(
      {
        to,
        status: FriendStatus.PENDING
      },
      'from',
      'to'
    );
  }

  async getOutgoingRequests(from: string) {
    return await this.findAndPopulate(
      {
        from,
        status: FriendStatus.PENDING
      },
      'from',
      'to'
    );
  }

  async getFriends(userId: string) {
    const result = await this.findAndPopulate(
      {
        $or: [{ from: userId }, { to: userId }],
        status: FriendStatus.FRIEND
      },
      'from',
      'to'
    );

    if (result?.length) {
      return result.map((e: any) => {
        return { ...e.toObject(), to: flattenUser(e.to), from: flattenUser(e.from) };
      });
    }

    return result;
  }

  async acceptFriendRequest(requestId: string) {
    return await this.updateOne({ _id: requestId }, { status: FriendStatus.FRIEND });
  }
}
