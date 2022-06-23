import { ChannelTypes } from 'config/constants/status';
import { ChannelDocument } from 'interfaces/Channel';
import { Channel } from 'models/channel';
import { Repository } from './Base';

export class ChannelRepository extends Repository<ChannelDocument> {
  constructor() {
    super(Channel);
  }

  async checkIfExistsDM(myId: string, userId: string) {
    return await this.findOneAndPopulate(
      {
        $or: [
          { $and: [{ 'userIds.0': myId }, { 'userIds.1': userId }] },
          { $and: [{ 'userIds.0': userId }, { 'userIds.1': myId }] }
        ],
        type: ChannelTypes.DM_CHANNEL
      },
      'userIds'
    );
  }
}
