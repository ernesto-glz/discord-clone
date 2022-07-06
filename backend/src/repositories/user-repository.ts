import { Repository } from './Base';
import { User } from 'models/user';
import { UserDocument } from 'interfaces/User';

export class UserRepository extends Repository<UserDocument> {
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
    delete u.hiddenDMChannels;
    return u;
  }
}
