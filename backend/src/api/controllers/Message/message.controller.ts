import { Request, Response } from 'express';
import { Message } from 'interfaces/Message';
import { MessageService } from 'api/services/message.service';

export class MessageController {
  static async getAllInChannel(req: Request, res: Response) {
    const { user } = res.locals;
    const { channelId } = req.params;
    const { limit, page } = req.query;

    const perPage = limit ? parseInt(limit.toString(), 10) : 30;
    const selectedPage = page ? parseInt(page.toString()) : 1;

    const messages = await MessageService.getAllPaginated(
      channelId,
      user._id,
      perPage,
      selectedPage
    );
    res.status(200).send(messages);
  }

  static async createMessage(req: Request, res: Response) {
    const { channelId, content } = req.body;
    const { user } = res.locals;

    const newMessage = await MessageService.create({
      sender: user._id,
      content,
      channelId
    } as Message);

    res.status(200).send(newMessage);
  }
}
