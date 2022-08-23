import { Entity } from '@dclone/types';
import { BadRequestException } from '@nestjs/common';
import { User, UserDocument } from 'src/data/models/user-model';
import DBWrapper from './db-wrapper';
import { sign, verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';

export default class Users extends DBWrapper<string, UserDocument> {
  public async calcDiscriminator(username: string) {
    const usersLength = await User.countDocuments({ username });
    const discriminator = usersLength + 1;
    if (discriminator > 9999)
      throw new BadRequestException(['Too many users have this username, please try another']);
    return discriminator;
  }

  public async getSelf(userId: string) {
    const selfUser = await User.findById(userId);
    if (!selfUser) throw new BadRequestException(['User not found']);
    return selfUser;
  }

  public async markAsRead(userId: string, message: Entity.Message) {
    const user = await User.findById(userId);

    if (!user) throw new BadRequestException(['User not found']);

    user.lastReadMessageIds ??= {};
    user.lastReadMessageIds[message.channelId] = message.id;
    user.markModified('lastReadMessageIds');

    await user.save();
  }

  public async addFriend(userId: string, friend: string) {
    return await User.updateOne({ _id: userId }, { $push: { friendIds: friend } })
  }

  public async getGuildUsers(guildIds: string[]) {
    return await User.find({ guildIds: { $in: guildIds } });
  }

  public async createToken(payload: { id: string }) {
    const key = await readFile('./keys/jwt', { encoding: 'utf-8' });
    return sign(payload, key, { algorithm: 'RS512', expiresIn: '30d' });
  }

  public async verifyToken(token: string | undefined) {
    if (!token) throw new Error('Token must be provided');
    const key = await readFile('./keys/jwt', { encoding: 'utf-8' });
    const decoded = verify(token as string, key, { algorithms: ['RS512'] }) as UserToken;
    return decoded?.id;
  }

  public secure(user: UserDocument): Entity.User {
    const u = { ...user.toObject() } as any;
    delete u.email;
    delete u.lastReadMessageIds;
    delete u.activeDMCS;
    delete u.password;
    return u;
  }
}

type UserToken = { id: string };
