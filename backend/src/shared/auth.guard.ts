import { UserTypes } from '@dclone/types';
import { verify } from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/data/models/user-model';
import { Request } from 'express';
import { patterns } from './patterns';
import { Reflector } from '@nestjs/core';

export type CustomRequest = Request & { user: UserTypes.Self };

@Injectable()
export class AuthGuard implements CanActivate {
  private userId: string;

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as CustomRequest;
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) return true;
    return await this.validateToken(request);
  }

  private async validateToken(request: CustomRequest): Promise<boolean> {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException(['Unauthorized']);
    const token = authHeader.split(' ')[1];
  
    try {
      this.userId = await app.users.verifyToken(token);
    } catch (error: any) {
      if (error?.name === 'JsonWebTokenError')
        throw new UnauthorizedException(['Invalid token']);
      if (error?.name === 'TokenExpiredError') 
        throw new UnauthorizedException(['Token expired']);

      throw new UnauthorizedException(['Unauthorized']);
    }
  
    const user = await User.findById(this.userId);
    if (!user)
      throw new UnauthorizedException(['User not found']);
  
    request.user = user.toObject();
    return true;
  }
}
