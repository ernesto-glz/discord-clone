import { UserTypes } from '@dclone/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'src/data/models/request-model';
import { User } from 'src/data/models/user-model';
import { CreateRequestDto } from './dto/create-request.dto';
import { generateSnowflake } from 'src/utils/snowflake'
import { ChannelsService } from '../channels/channels.service';

@Injectable()
export class RequestsService {
  constructor(private readonly channelsService: ChannelsService) {}

  async create(createRequestDto: CreateRequestDto, self: UserTypes.Self) {
    const { username, discriminator } = createRequestDto;
    const user = await User.findOne({ username, discriminator });

    if (!user || user.id === self.id) 
      throw new BadRequestException(
        [`Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct.`]
      )

    const alreadyExists = await app.requests.find(self.id, user.id);

    if (self.friendIds.includes(user.id))
      throw new BadRequestException([`You're already friends with that user!`]);
    else if (alreadyExists) 
      throw new BadRequestException(['Friend request already exists']);

    const request = new Request({
      _id: generateSnowflake(),
      from: self.id,
      to: user.id
    });
    await request.save();
    
    return await request.populate(['from', 'to']);
  }

  async delete(requestId: string, selfId: string) {
    const request = await Request.findOne({
      _id: requestId,
      $or: [{ to: selfId }, { from: selfId }]
    }).populate(['from', 'to']);
    
    if (!request) 
      throw new BadRequestException(['Request not found']);

    await request.delete();
    return request;
  }

  async accept(requestId: string, selfId: string) {
    const request = await Request.findOne({ _id: requestId, to: selfId });
    const { from, to } = request;

    if (!request)
      throw new BadRequestException(['Request not found']);

    await request.delete();
    await app.users.addFriend(from, to);
    await app.users.addFriend(to, from);

    const DM = await this.channelsService.createDM(from, to);
    return { friendId: from, channel: DM };
  }
}
