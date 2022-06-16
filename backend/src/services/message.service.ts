import { ApiError } from 'errors/ApiError';
import { Message } from 'interfaces/Message';
import { MessageRepository } from 'repositories/message.repository';
import { ChannelRepository } from 'repositories/channel.repository';
import { ApiResponses } from 'config/constants/api-responses';

export class MessageService {
  private static messageRepository = new MessageRepository();
  private static channelRepository = new ChannelRepository();

  static async getAllPaginated(
    channelId: string,
    userId: string,
    limit: number,
    selectedPage: number
  ) {
    const channel = await this.channelRepository.findOne({
      _id: channelId,
      $or: [{ sender: userId }, { receiver: userId }]
    });

    if (!channel) {
      throw new ApiError(400, ApiResponses.NO_MESSAGES_FOUND);
    }

    const messages = await this.messageRepository.paginate(
      { channelId },
      { limit, page: selectedPage, sort: { _id: 'desc' }, populate: 'sender' }
    );

    if (!messages.docs.length) {
      return messages.docs;
    }

    return messages;
  }

  static async create(data: Message) {
    const message = await (
      await this.messageRepository.create(data)
    ).populate('sender');
    const channel = await this.channelRepository.findById(message.channelId);
    return { ...message.toObject(), guildId: channel?.guildId };
  }
}
