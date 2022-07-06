import { Auth } from 'shared/auth';
import { ApiError } from 'api/errors/ApiError';
import { ApiResponses } from 'config/constants/api-responses';
import { generateSnowflake, toFourDigits } from 'utils';

export class AuthService {
  public static async signIn(email: string, password: string) {
    const userFound = await app.users.findWithPassword(email);

    if (!userFound) {
      throw new ApiError(401, ApiResponses['INVALID_CREDENTIALS']);
    }

    if (!(await Auth.checkCredentials(password, userFound.password)))
      throw new ApiError(401, ApiResponses['INVALID_CREDENTIALS']);

    return await app.users.findOne({ email });
  }

  public static async calcDiscriminator(username: string) {
    const usersLength = await app.users.countDocuments({ username });
    const discriminator = usersLength + 1;
    if (discriminator > 9999) throw new ApiError(400, ApiResponses['DISCRIM_OUT_OF_RANGE']);
    return discriminator;
  }

  public static async signUp(username: string, password: string, email: string) {
    const userExists = await app.users.findOne({ email });

    if (userExists) throw new ApiError(409, ApiResponses['EMAIL_ALREADY_USED']);

    const hashedPassword = await Auth.hashPassword(password);
    const discriminator = await this.calcDiscriminator(username);

    await app.users.create({
      _id: generateSnowflake(),
      username,
      password: hashedPassword,
      email,
      discriminator: toFourDigits(discriminator),
      guildIds: []
    });

    return await app.users.findOne({ email });
  }
}
