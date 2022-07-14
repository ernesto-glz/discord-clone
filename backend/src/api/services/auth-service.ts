import { Auth } from 'shared/auth';
import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { generateSnowflake } from 'utils/snowflake';

export class AuthService {
  public static async signIn(email: string, password: string) {
    const userFound = await app.users.findWithPassword(email);

    if (!userFound)
      throw new ApiError(401, ApiResponses['INVALID_CREDENTIALS']);
    else if (!(await Auth.checkCredentials(password, userFound.password)))
      throw new ApiError(401, ApiResponses['INVALID_CREDENTIALS']);

    return app.users.secure(userFound);
  }

  public static async calcDiscriminator(username: string) {
    const usersLength = await app.users.countDocuments({ username });
    const discriminator = usersLength + 1;
    if (discriminator > 9999)
      throw new ApiError(400, ApiResponses['DISCRIM_OUT_OF_RANGE']);
    return discriminator;
  }

  public static async signUp(username: string, password: string, email: string) {
    const userExists = await app.users.findOne({ email });

    if (userExists)
      throw new ApiError(409, ApiResponses['EMAIL_ALREADY_USED']);

    const hashedPassword = await Auth.hashPassword(password);
    const discriminator = await this.calcDiscriminator(username);

    const created = await app.users.create({
      _id: generateSnowflake(),
      username,
      password: hashedPassword,
      email,
      avatar: Math.floor(Math.random() * 5).toString(),
      discriminator: discriminator.toString().padStart(4, '0')
    });

    return app.users.secure(created);
  }
}
