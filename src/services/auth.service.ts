import { Auth } from 'shared/auth';
import { ApiError } from 'errors/ApiError';
import { UserRepository } from 'repositories/user.repository';
import { generateShortId } from 'utils';
import { ApiResponses } from 'config/constants/api-responses';

export class AuthService {
  private static userRepository = new UserRepository();

  public static async signIn(email: string, password: string) {
    const userFound = await this.userRepository.findWithPassword(email);

    if (!userFound) {
      throw new ApiError(401, ApiResponses.INVALID_CREDENTIALS);
    }

    const isAuthorized = await Auth.checkCredentials(password, userFound.password);

    if (!isAuthorized) {
      throw new ApiError(401, ApiResponses.INVALID_CREDENTIALS);
    }

    return userFound.toObject();
  }

  public static async signUp(username: string, password: string, email: string) {
    const userExists = await this.userRepository.findOne({ email });

    if (userExists) {
      throw new ApiError(409, ApiResponses.EMAIL_ALREADY_USED);
    }

    const hashedPassword = await Auth.hashPassword(password);

    return await this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      shortId: generateShortId()
    });
  }
}
