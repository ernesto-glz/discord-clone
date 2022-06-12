import { ApiError } from 'errors/ApiError';
import { UserRepository } from 'repositories/user.repository';
import { ApiResponses } from 'config/constants/api-responses';

export class UserService {
  private static userRepository = new UserRepository();

  public static async getUser(userId: string) {
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    }
    return foundUser;
  }

  public static setUserStatus = async (
    userId: string,
    status: 'ONLINE' | 'OFFLINE'
  ) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ApiError(400, ApiResponses.USER_NOT_FOUND);
    return await this.userRepository.updateOne({ _id: userId }, { status });
  };
}
