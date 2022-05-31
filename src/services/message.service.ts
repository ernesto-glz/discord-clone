import { ApiError } from 'errors/ApiError';
import { Message } from 'interfaces/Message';
import { MessageRepository } from 'repositories/message.repository';
import { RoomRepository } from 'repositories/room.repository';
import { ApiResponses } from 'config/constants/api-responses';

export class MessageService {
  private static messageRepository = new MessageRepository();
  private static roomRepository = new RoomRepository();

  static async getAllInRoom(
    roomId: string,
    userId: string,
    limit: number,
    selectedPage: number
  ) {
    const room = await this.roomRepository.findOne({
      _id: roomId,
      $or: [{ sender: userId }, { receiver: userId }]
    });

    if (!room) {
      throw new ApiError(400, ApiResponses.NO_MESSAGES_FOUND);
    }

    const messages = await this.messageRepository.paginate(
      { roomId },
      { limit, page: selectedPage, sort: { _id: 'desc' }, populate: 'sender' }
    );

    if (!messages.docs.length) {
      return messages.docs;
    }

    return messages;
  }

  static async createMessage(data: Message) {
    const message = await (
      await this.messageRepository.create(data)
    ).populate('sender');
    return { ...message.toObject() };
  }
}
