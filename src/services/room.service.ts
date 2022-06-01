import {
  CreateRoom,
  getAllRooms,
  getOrCreateRoom,
  getRoomById
} from 'src/api/room';
import { loadAbort } from 'src/utils/load-abort-axios';

export class RoomService {
  static getOrCreateRoom(data: CreateRoom) {
    const controller = loadAbort();
    return {
      call: getOrCreateRoom(controller, data),
      controller
    };
  }

  static getAllRooms() {
    const controller = loadAbort();
    return {
      call: getAllRooms(controller),
      controller
    };
  }

  static getRoomById(roomId: string) {
    const controller = loadAbort();
    return {
      call: getRoomById(controller, roomId),
      controller
    };
  }
}
