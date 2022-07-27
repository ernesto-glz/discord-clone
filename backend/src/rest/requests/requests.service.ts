import { UserTypes } from '@discord/types';
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
    const userFound = await User.findOne({ username, discriminator });

    if (!userFound || userFound.id === self.id) 
      throw new BadRequestException(
        `Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct.`
      )

    const alreadyRequest = await app.requests.checkExistence(self.id, userFound.id);

    if (self.friendIds.includes(userFound.id))
      throw new BadRequestException(`You're already friends with that user!`);
    else if (alreadyRequest) 
      throw new BadRequestException('Friend request already exists');

    const created = await Request.create({
      _id: generateSnowflake(),
      from: self.id,
      to: userFound.id
    });

    return await Request.findOne({ _id: created.id }).populate(['from', 'to']);
  }

  async delete(requestId: string, selfId: string) {
    const request = await Request.findOne({
      _id: requestId,
      $or: [{ to: selfId }, { from: selfId }]
    }).populate(['from', 'to']);
    
    if (!request) 
      throw new BadRequestException('Request not found');

    await Request.findByIdAndDelete(requestId);
    return request;
  }

  async accept(requestId: string, selfId: string) {
    const request = await Request.findOne({
      _id: requestId,
      to: selfId
    });

    if (!request)
      throw new BadRequestException('Request not found');

    await Request.findByIdAndDelete(requestId);

    await User.updateOne({ _id: request.from }, {
      $push: { friendIds: request.to as unknown as string }
    });
    
    await User.updateOne({ _id: request.to }, {
      $push: { friendIds: request.from as unknown as string }
    });

    const createdDM = await this.channelsService.createDM(
      request.from as unknown as string, 
      request.to as unknown as string
    );

    return { friendId: request.from, channel: createdDM.channel };
  }
}
