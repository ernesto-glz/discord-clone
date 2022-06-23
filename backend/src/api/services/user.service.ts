import { ApiError } from 'api/errors/ApiError';
import { ApiResponses } from 'config/constants/api-responses';
import { Message } from 'interfaces/Message';

export class UserService {
  public static async getUser(userId: string) {
    const foundUser = await app.users.findById(userId);
    if (!foundUser) throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    return foundUser;
  }

  public static setUserStatus = async (userId: string, status: 'ONLINE' | 'OFFLINE') => {
    const user = await app.users.findById(userId);
    if (!user) throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    return await app.users.updateOne({ _id: userId }, { status });
  };

  public static setInHiddenDMS = async (userId: string, channelId: string) => {
    const result = await app.users.updateOne({ _id: userId }, { $push: { hiddenDMChannels: channelId } });
    return result;
  };

  public static markAsRead = async (userId: string, message: Message) => {
    const user = await app.users.findById(userId);
    if (!user) throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    if (user.lastReadMessageIds) {
      user.lastReadMessageIds[message.channelId] = message._id;
      user.markModified('lastReadMessageIds');
    }
    await user.save();
  };
}
