import { Auth } from 'shared/auth';
import { ApiError } from 'api/errors/ApiError';
import { generateShortId } from 'utils';
import { ApiResponses } from 'config/constants/api-responses';

export class AuthService {
  public static async signIn(email: string, password: string) {
    const userFound = await app.users.findWithPassword(email);

    if (!userFound) {
      throw new ApiError(401, ApiResponses.INVALID_CREDENTIALS);
    }

    if (!(await Auth.checkCredentials(password, userFound.password)))
      throw new ApiError(401, ApiResponses.INVALID_CREDENTIALS);

    return await app.users.findOneAndSelect({ email }, '+hiddenDMChannels');
  }

  public static async signUp(username: string, password: string, email: string) {
    const userExists = await app.users.findOne({ email });

    if (userExists) throw new ApiError(409, ApiResponses.EMAIL_ALREADY_USED);

    const hashedPassword = await Auth.hashPassword(password);

    await app.users.create({
      username,
      password: hashedPassword,
      email,
      shortId: generateShortId(),
      guildIds: []
    });

    return await app.users.findOneAndSelect({ email }, '+hiddenDMChannels');
  }
}
