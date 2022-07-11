import { hash, compare } from 'bcrypt';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { UserDocument } from 'interfaces/User';
import { ApiErrors } from 'config/constants/api-errors';

export class Auth {
  private static saltRounds = 10;

  static async hashPassword(password: string) {
    return await hash(password, this.saltRounds);
  }

  static async checkCredentials(password: string, hashedPwd: string) {
    return await compare(password, hashedPwd);
  }

  static createToken(user: UserDocument, statusCode: number, res: Response) {
    const payload = { id: user.id };

    if (!process.env.JWT_SECRET_KEY) {
      console.log(ApiErrors.NO_JWT_SECRET_KEY);
      throw new Error(ApiErrors.NO_JWT_SECRET_KEY);
    }

    const token = sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN || '30d'
    });

    const partialUser = { ...user.toObject() } as any;
    delete partialUser.password;
    res.status(statusCode).json({ token, user: partialUser });
  }
}
