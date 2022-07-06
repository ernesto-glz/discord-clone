import { FriendStatus } from 'config/constants/status';
import { FriendDocument } from 'interfaces/Friend';
import { Friend } from 'data/models/friend';
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

  async getFriends(userId: string) {
    const result = await this.find({
      $or: [{ from: userId }, { to: userId }],
      status: FriendStatus.FRIEND
    });

    if (!result) return null;

    return result.map((f) => f.from === userId ? f.to : f.from)
  }

  async acceptFriendRequest(requestId: string) {
    return await this.updateOne({ _id: requestId }, { status: FriendStatus.FRIEND });
  }

  async getRequests(selfId: string) {
    const requests = await this.findAndPopulate({ 
      $or: [{ to: selfId }, { from: selfId }], status: 'PENDING' 
    }, ['from', 'to']);

    if (!requests) return [];

    return requests.map((r) => {
      if (r.from === selfId) return { ...r, type: 'OUTGOING' };
      return { ...r.toObject(), type: 'INCOMING' }
    })
  }
}
