import { Repository } from './Base';
import { User, UserDocument } from 'data/models/user';

export class UsersRepository extends Repository<UserDocument> {
  constructor() {
    super(User);
  }

  async findWithPassword(email: string) {
    return await this.findOneAndSelect({ email }, '+password');
  }

  public secure(user: UserDocument) {
    const u = { ...user.toObject() } as any;
    delete u.email;
    delete u.lastReadMessageIds;
    delete u.activeDMCS;
    return u;
  }
}
