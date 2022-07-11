import { FriendDocument } from 'interfaces/Friend';
import { Friend } from 'data/models/friend';
import { Repository } from './Base';

export class FriendsRepository extends Repository<FriendDocument> {
  constructor() {
    super(Friend);
  }

  async checkExistence(fromId: string, userId: string) {
    return await this.findOne({
      $or: [{ $and: [{ from: userId }, { to: fromId }] }, 
      { $and: [{ from: fromId }, { to: userId }] }]
    });
  }

  async getFriends(userId: string) {
    const result = await this.find({
      $or: [{ from: userId }, { to: userId }],
      status: 'FRIEND'
    });

    if (!result) return null;

    return result.map((request) => request.from === userId ? request.to : request.from)
  }

  async acceptFriendRequest(requestId: string) {
    return await this.updateOne({ _id: requestId }, { status: 'FRIEND' });
  }

  async getRequests(selfId: string) {
    const requests = await this.findAndPopulate({ 
      $or: [{ to: selfId }, { from: selfId }], status: 'PENDING' 
    }, ['from', 'to']);

    if (!requests) return [];

    return requests.map((request) => {
      if (request.from === selfId) return { ...request.toObject(), type: 'OUTGOING' };
      return { ...request.toObject(), type: 'INCOMING' }
    })
  }
}
