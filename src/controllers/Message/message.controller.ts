import { Request, Response } from 'express';
import { MessageService } from 'services/message.service';

export class MessageController {
  static async getAllInRoom(req: Request, res: Response) {
    const { user } = res.locals;
    const { roomId } = req.params;
    const { limit, page } = req.query;

    const perPage = limit ? parseInt(limit.toString(), 10) : 30;
    const selectedPage = page ? parseInt(page.toString()) : 1;

    const messages = await MessageService.getAllInRoom(
      roomId,
      user._id,
      perPage,
      selectedPage
    );
    res.status(200).send(messages);
  }

  static async createMessage(req: Request, res: Response) {
    const { roomId, content } = req.body;
    const { user } = res.locals;

    const newMessage = await MessageService.createMessage({
      sender: user._id,
      content,
      roomId
    });

    res.status(200).send(newMessage);
  }
}
