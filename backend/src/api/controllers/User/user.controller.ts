import { Request, Response } from 'express';
import { UserService } from 'api/services/user.service';

export class UserController {
  static async getUser(req: Request, res: Response) {
    const { userId } = req.params;
    const userInfo = await UserService.getUser(userId);
    res.status(200).send(userInfo);
  }

  static async getSelfUser(req: Request, res: Response) {
    const selfUser = res.locals;
    const result = await UserService.getUser(selfUser._id);
    res.status(200).send(result);
  }
}
