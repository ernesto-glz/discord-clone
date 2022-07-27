import { UserTypes } from '@discord/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Channel } from 'src/data/models/channel-model';
import { User } from 'src/data/models/user-model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  async fetchEntities(user: UserTypes.Self) {
    const { id: userId, guildIds } = user;
  
    const [channels, users, requests] = await Promise.all([
      Channel.find({ userIds: userId }),
      User.find({ guildIds: { $in: guildIds } }),
      app.requests.get(userId)
    ]);
  
    const securedUsers = users?.map((u) => app.users.secure(u));
    const filledChannels = await Promise.all(
      (channels ?? []).map(async (c) => await app.channels.fillInfo(c.toObject(), userId))
    );
  
    return {
      channels: filledChannels,
      users: securedUsers,
      requests
    };
  }

  async deleteUser(selfUser: UserTypes.Self, password: string) {
    const self = await User.findById(selfUser.id).select('+password');

    if (!(await this.authService.checkCredentials(password, self.password)))
      throw new UnauthorizedException('Password does not match.');

    self.locked ??= true;
    self.username = 'Deleted User';
    self.discriminator = '0000';
    await self.save();

    return { 
      userId: selfUser.id, 
      partialUser: app.users.secure(self) 
    }
  }
}
