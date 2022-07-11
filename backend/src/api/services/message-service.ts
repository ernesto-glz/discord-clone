import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { UserService } from './user-service';
import { generateSnowflake } from 'utils/snowflake';
import { Entity } from '@discord/types';
import { Message } from 'data/models/message';

export class MessageService {
  static async getPaginated(channelId: string, userId: string, limit: number, page: number) {
    const channel = await app.channels.findOne({
      _id: channelId,
      $or: [{ sender: userId }, { receiver: userId }]
    });

    if (!channel) {
      throw new ApiError(400, ApiResponses.NO_MESSAGES_FOUND);
    }

    const messages = await Message.paginate(
      { channelId },
      { limit, page, sort: { _id: 'desc' } }
    );

    if (!messages.docs.length) {
      return messages.docs;
    }

    const lastMessage = messages.docs[0];
    if (lastMessage._id === channel.lastMessageId) {
      UserService.markAsRead(userId, lastMessage);
    }

    return messages;
  }

  static async create(data: Entity.Message) {
    const { channelId, sender } = data;

    const message = await app.messages.create({
      ...data,
      _id: generateSnowflake()
    });

    const channel = await app.channels.findById(channelId);
    const user = await app.users.findOne({ _id: sender });

    if (!channel || !user) throw new ApiError(500, ApiResponses.SOMETHING_WRONG);

    user.lastReadMessageIds[channelId] = message.id;
    channel.lastMessageId = message.id;
    user.markModified('lastReadMessageIds');
    channel.markModified('lastMessageId');
    await channel.save();
    await user.save();

    return { ...message.toObject(), guildId: channel.guildId };
  }
}
