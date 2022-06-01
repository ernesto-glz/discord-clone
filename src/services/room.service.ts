import { ApiError } from 'errors/ApiError';
import { CreateRoom } from 'interfaces/Room';
import { RoomRepository } from 'repositories/room.repository';
import { UserRepository } from 'repositories/user.repository';
import { ApiResponses } from 'config/constants/api-responses';
import { MessageRepository } from '../repositories/message.repository';

export class RoomService {
  private static roomRepository = new RoomRepository();
  private static userRepository = new UserRepository();
  private static messageRepository = new MessageRepository();

  static async getOrCreateRoom({ userId, receiverId }: CreateRoom) {
    const alreadyRoom = await this.roomRepository.checkExistence(
      userId,
      receiverId
    );

    if (alreadyRoom) return alreadyRoom;

    return await this.roomRepository.create({
      sender: userId,
      receiver: receiverId,
      createdBy: userId
    });
  }

  static async getAllRooms(userId: string, extraInfo: boolean) {
    const foundRooms = await this.roomRepository.find({
      $or: [{ sender: userId }, { receiver: userId }]
    });

    if (!foundRooms) {
      throw new ApiError(400, ApiResponses.NO_ROOMS_FOUND);
    }

    if (!foundRooms.length || !extraInfo) {
      return foundRooms;
    }

    return await Promise.all(
      foundRooms.map(async (room) => {
        const { sender, receiver } = room;
        const id = sender.toString() === userId ? receiver : sender;
        const userInfo = await this.userRepository.findOne({ _id: id });
        return { ...room.toObject(), userInfo };
      })
    );
  }

  static async deleteRoom(roomId: string, userId: string) {
    const room = await this.roomRepository.findOne({
      _id: roomId,
      $or: [{ sender: userId }, { receiver: userId }]
    });

    if (!room) {
      throw new ApiError(400, ApiResponses.ROOM_NOT_FOUND);
    }

    //first delete messages from the room
    await this.messageRepository.deleteMany({ roomId: room._id });
    return await room.delete();
  }

  static async getRoomById(roomId: string, userId: string) {
    const room = await this.roomRepository.findOneAndPopulate(
      {
        $or: [{ sender: userId }, { receiver: userId }],
        _id: roomId
      },
      'sender',
      'receiver'
    );

    if (!room) {
      throw new ApiError(400, ApiResponses.ROOM_NOT_FOUND);
    }

    return room;
  }
}
