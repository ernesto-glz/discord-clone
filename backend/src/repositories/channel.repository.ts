import { ChannelDocument } from 'interfaces/Channel';
import { Channel } from 'models/Channel';
import { Repository } from './Base';

export class ChannelRepository extends Repository<ChannelDocument> {
  constructor() {
    super(Channel);
  }

  async checkExistence(guildId: string, userId: string) {
    return await this.findOneAndPopulate(
      { guildId, userIds: userId },
      'userIds'
    );
  }
}
