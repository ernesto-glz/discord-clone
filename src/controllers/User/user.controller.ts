import { Request, Response } from 'express';
import { UserService } from 'services/user.service';

export class UserController {
  static async getUser(req: Request, res: Response) {
    const { userId } = req.params;
    const userInfo = await UserService.getUser(userId);
    res.status(200).send(userInfo);
  }
}
