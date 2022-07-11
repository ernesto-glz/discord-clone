import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { Entity } from '@discord/types';

export class UserService {
  public static async getUser(userId: string) {
    const foundUser = await app.users.findById(userId);

    if (!foundUser)
      throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    
    return foundUser;
  }

  public static setUserStatus = async (userId: string, status: 'ONLINE' | 'OFFLINE') => {
    const user = await app.users.findById(userId);

    if (!user) 
      throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    
    return await app.users.updateOne({ _id: userId }, { status });
  };

  public static markAsRead = async (userId: string, message: Entity.Message) => {
    const user = await app.users.findById(userId);
    
    if (!user)
      throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    if (user.lastReadMessageIds) {
      user.lastReadMessageIds[message.channelId] = message.id;
      user.markModified('lastReadMessageIds');
    }

    await user.save();
  };
}
