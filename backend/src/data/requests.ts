import { Request, RequestDocument } from 'src/data/models/request-model';
import DBWrapper from './db-wrapper';

export default class Requests extends DBWrapper<string, RequestDocument> {
  async get(selfId: string) {
    const requests = await Request.find({ 
      $or: [{ to: selfId }, { from: selfId }]
    }).populate(['from', 'to']);

    if (!requests) return [];

    return requests.map((request: any) => {
      if (request.from.id === selfId) return { ...request.toObject(), type: 'OUTGOING' };
      return { ...request.toObject(), type: 'INCOMING' }
    })
  }

  async checkExistence(fromId: string, userId: string) {
    return await Request.findOne({
      $or: [{ $and: [{ from: userId }, { to: fromId }] }, 
      { $and: [{ from: fromId }, { to: userId }] }]
    });
  }
}
