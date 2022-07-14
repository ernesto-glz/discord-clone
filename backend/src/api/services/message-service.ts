import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { UserService } from './user-service';
import { Message } from 'data/models/message';

export class MessageService {
  static async getPaginated(channelId: string, userId: string, limit: number, page: number) {
    const channel = await app.channels.findOne({
      _id: channelId,
      $or: [{ sender: userId }, { receiver: userId }]
    });
    
    if (!channel)
      throw new ApiError(400, ApiResponses.NO_MESSAGES_FOUND);
    
    const messages = await Message.paginate({ channelId }, { limit, page, sort: { _id: 'desc' } } );
    
    if (!messages.docs.length)
      return messages.docs;

    const lastMessage = messages.docs[0];
    
    if (lastMessage.id === channel.lastMessageId)
      UserService.markAsRead(userId, lastMessage);

    return messages;
  }
}
