import { ApiError } from 'errors/ApiError';
import { UserRepository } from 'repositories/user.repository';
import { ApiResponses } from 'config/constants/api-responses';
import { Message } from 'interfaces/Message';

export class UserService {
  private static userRepository = new UserRepository();

  public static async getUser(userId: string) {
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    }
    return foundUser;
  }

  public static setUserStatus = async (userId: string, status: 'ONLINE' | 'OFFLINE') => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    return await this.userRepository.updateOne({ _id: userId }, { status });
  };

  public static setInHiddenDMS = async (userId: string, channelId: string) => {
    const result = await this.userRepository.updateOne(
      { _id: userId },
      { $push: { hiddenDMChannels: channelId } }
    );
    return result;
  };

  public static markAsRead = async (userId: string, message: Message) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    if (user.lastReadMessageIds) {
      user.lastReadMessageIds[message.channelId] = message._id;
      user.markModified('lastReadMessageIds');
    }
    await user.save();
  };
}
