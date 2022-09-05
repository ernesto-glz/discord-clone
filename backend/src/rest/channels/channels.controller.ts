import { UserTypes } from '@dclone/types';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { User } from 'src/shared/user.decorator';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { GetMessagesParamDto, GetMessagesQueryDto } from './dto/get-messages.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  create(@Body() createChannelDto: CreateChannelDto, @User() selfUser: UserTypes.Self) {
    return this.channelsService.createDM(selfUser.id, createChannelDto.userId);
  }

  @Get('/:channelId/messages')
  getMessages(
    @Query() queryParams: GetMessagesQueryDto,
    @Param() params: GetMessagesParamDto,
    @User() selfUser: UserTypes.Self
  ) {
    const { back } = queryParams;
    const { channelId } = params;
    return this.channelsService.getMessages(channelId, selfUser.id, back);
  }

  @Delete('/:channelId/messages/:messageId')
  deleteMessage(@Param() params: DeleteMessageDto, @User() selfUser: UserTypes.Self) {
    return this.channelsService.deleteMessage(params, selfUser);
  }
}
