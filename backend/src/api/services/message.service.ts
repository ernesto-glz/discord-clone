import { ApiError } from 'api/errors/ApiError';
import { Message } from 'interfaces/Message';
import { ApiResponses } from 'config/constants/api-responses';
import { UserService } from './user.service';
import { generateSnowflake } from 'utils';

export class MessageService {
  static async getPaginated(channelId: string, userId: string, limit: number, selectedPage: number) {
    const channel = await app.channels.findOne({
      _id: channelId,
      $or: [{ sender: userId }, { receiver: userId }]
    });

    if (!channel) {
      throw new ApiError(400, ApiResponses.NO_MESSAGES_FOUND);
    }

    const messages = await app.messages.paginate(
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
      await app.messages.create({
        ...data,
        _id: generateSnowflake()
      })
    ).populate('sender');
    const channel = await app.channels.findById(channelId);
    const user = await app.users.findOne({ _id: sender });

    if (!channel || !user) throw new ApiError(500, ApiResponses.SOMETHING_WRONG);

    user.lastReadMessageIds[channelId] = message._id.toString();
    channel.lastMessageId = message._id.toString();
    user.markModified('lastReadMessageIds');
    channel.markModified('lastMessageId');
    await channel.save();
    await user.save();

    return { ...message.toObject(), guildId: channel.guildId };
  }
}
