import { Request, Response } from 'express';
import { ChannelService } from 'services/channel.service';

export class ChannelController {
  static async createDM(req: Request, res: Response) {
    const user = res.locals.user;
    const { userId } = req.body;
  const channel = await ChannelService.createDM({
      myId: user._id,
      userId
    });
    res.status(200).send(channel);
  }

  static async getAll(req: Request, res: Response) {
    const user = res.locals.user;
    const channels = await ChannelService.getAll(user._id);
    res.status(200).send(channels);
  }

  static async getById(req: Request, res: Response) {
    const { channelId } = req.params;
    const channel = await ChannelService.getById(channelId);
    res.status(200).send(channel);
  }
}
