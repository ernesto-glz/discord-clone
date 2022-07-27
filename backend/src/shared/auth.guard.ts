import { verify } from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/data/models/user-model';
import { Request } from 'express';
import { Entity } from '@discord/types';
import { patterns } from './patterns';

export type CustomRequest = Request & { user: Entity.UserTypes.Self };

@Injectable()
export class AuthGuard implements CanActivate {
  private decoded: any;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as CustomRequest;
    
    // Don't apply to [login, register] routes
    if (patterns.authRoutes.test(request.path))
      return true;

    return await this.validateToken(request);
  }

  private async validateToken(request: CustomRequest): Promise<boolean> {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();
    const token = authHeader.split(' ')[1];
  
    try {
      this.decoded = verify(token, process.env.JWT_SECRET_KEY);
    } catch (error: any) {
      if (error?.name === 'JsonWebTokenError')
        throw new UnauthorizedException('Invalid token');
      if (error?.name === 'TokenExpiredError') 
        throw new UnauthorizedException('Token expired');

      throw new UnauthorizedException();
    }
  
    const user = await User.findById(this.decoded.id);
    if (!user)
      throw new UnauthorizedException('User not found');
  
    request.user = user.toObject();
    return true;
  }
}
