import { RoomDocument } from 'interfaces/Room';
import { Room } from 'models/Room.model';
import { Repository } from './Base';

export class RoomRepository extends Repository<RoomDocument> {
  constructor() {
    super(Room);
  }

  async checkExistence(userId: string, receiverId: string) {
    return await this.findOne({
      $or: [
        { $and: [{ sender: userId }, { receiver: receiverId }] },
        { $and: [{ sender: receiverId }, { receiver: userId }] }
      ]
    });
  }
}
