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
}
