import { Repository } from './Base';
import { User, UserDocument } from 'data/models/user';
import { ApiError } from 'api/modules/api-error';

export class UsersRepository extends Repository<UserDocument> {
  constructor() {
    super(User);
  }

  async findWithPassword(email: string) {
    return await this.findOneAndSelect({ email }, '+password');
  }

  async getSelf(userId: string) {
    const selfUser = await app.users.findById(userId);
    if (!selfUser)
      throw new ApiError(400, 'User not found');
    return selfUser;
  }

  public secure(user: UserDocument) {
    const u = { ...user.toObject() } as any;
    delete u.email;
    delete u.lastReadMessageIds;
    delete u.activeDMCS;
    return u;
  }
}
