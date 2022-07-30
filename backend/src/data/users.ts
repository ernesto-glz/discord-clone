import { Entity } from '@discord/types';
import { BadRequestException } from '@nestjs/common';
import { User, UserDocument } from 'src/data/models/user-model';
import DBWrapper from './db-wrapper';

export default class Users extends DBWrapper<string, UserDocument> {
  public secure(user: UserDocument) {
    const u = { ...user.toObject() } as any;
    delete u.email;
    delete u.lastReadMessageIds;
    delete u.activeDMCS;
    delete u.password;
    return u;
  }

  public async calcDiscriminator(username: string) {
    const usersLength = await User.countDocuments({ username });
    const discriminator = usersLength + 1;
    if (discriminator > 9999)
      throw new BadRequestException(['Too many users have this username, please try another']);
    return discriminator;
  }

  async getSelf(userId: string) {
    const selfUser = await User.findById(userId);
    if (!selfUser)
      throw new BadRequestException(['User not found']);
    return selfUser;
  }

  markAsRead = async (userId: string, message: Entity.Message) => {
    const user = await User.findById(userId);
    
    if (!user)
      throw new BadRequestException(['User not found']);
    
    user.lastReadMessageIds ??= {};
    user.lastReadMessageIds[message.channelId] = message.id;
    user.markModified('lastReadMessageIds');

    await user.save();
  };
}
