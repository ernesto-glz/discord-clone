import { Request, Response } from 'express';
import { AuthService } from 'services/auth.service';
import { Auth } from 'shared/auth';

export class AuthController {
  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await AuthService.signIn(email, password);
    Auth.createToken(user, 200, res);
  }

  static async signUp(req: Request, res: Response) {
    const { username, password, email } = req.body;
    const user = await AuthService.signUp(username, password, email);
    Auth.createToken(user, 201, res);
  }
}
