import { Request, Response } from 'express';
import { RoomService } from 'services/room.service';

export class RoomController {
  static async createRoom(req: Request, res: Response) {
    const { user } = res.locals;
    const { receiverId } = req.body;
    const room = await RoomService.getOrCreateRoom({ userId: user._id.toString(), receiverId });
    res.status(200).send(room);
  }

  static async getAllRooms(req: Request, res: Response) {
    const { user } = res.locals;
    const rooms = await RoomService.getAllRooms(user._id.toString(), true);
    res.status(200).send(rooms);
  }
}
