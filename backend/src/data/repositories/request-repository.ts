import { Request, RequestDocument } from 'data/models/request';
import { Repository } from './Base';

export class RequestsRepository extends Repository<RequestDocument> {
  constructor() {
    super(Request);
  }

  async checkExistence(fromId: string, userId: string) {
    return await this.findOne({
      $or: [{ $and: [{ from: userId }, { to: fromId }] }, 
      { $and: [{ from: fromId }, { to: userId }] }]
    });
  }

  async get(selfId: string) {
    const requests = await this.findAndPopulate({ 
      $or: [{ to: selfId }, { from: selfId }]
    }, ['from', 'to']);

    if (!requests) return [];

    return requests.map((request) => {
      if (request.from.id === selfId) return { ...request.toObject(), type: 'OUTGOING' };
      return { ...request.toObject(), type: 'INCOMING' }
    })
  }
}
