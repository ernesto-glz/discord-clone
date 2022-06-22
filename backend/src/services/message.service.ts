import { ApiError } from 'errors/ApiError';
import { Message } from 'interfaces/Message';
import { MessageRepository } from 'repositories/message.repository';
import { ChannelRepository } from 'repositories/channel.repository';
import { ApiResponses } from 'config/constants/api-responses';
import { User } from 'models/User.model';
import { Channel } from 'models/Channel';
import { UserService } from './user.service';

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

    const lastMessage = messages.docs[0];
    if (lastMessage._id.toString() === channel.lastMessageId) {
      UserService.markAsRead(userId, lastMessage);
    }

    return messages;
  }

  static async create(data: Message) {
    const { channelId, sender } = data;

    const message = await (
      await this.messageRepository.create(data)
    ).populate('sender');
    const channel = await Channel.findById(channelId);
    const user = await User.findOne({ _id: sender });

    if (!channel || !user)
      throw new ApiError(500, ApiResponses.SOMETHING_WRONG);

    user.lastReadMessageIds[channelId] = message._id.toString();
    channel.lastMessageId = message._id.toString();
    user.markModified('lastReadMessageIds');
    channel.markModified('lastMessageId');
    await channel.save();
    await user.save();

    return { ...message.toObject(), guildId: channel.guildId };
  }
}
