import { ApiError } from 'errors/ApiError';
import { CreateRoom } from 'interfaces/Room';
import { RoomRepository } from 'repositories/room.repository';
import { UserRepository } from 'repositories/user.repository';
import { ApiResponses } from 'config/constants/api-responses';

export class RoomService {
  private static roomRepository = new RoomRepository();
  private static userRepository = new UserRepository();

  static async getOrCreateRoom({ userId, receiverId }: CreateRoom) {
    const alreadyRoom = await this.roomRepository.checkExistence(userId, receiverId);

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
}
