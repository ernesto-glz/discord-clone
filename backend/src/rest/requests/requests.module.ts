import { Module } from '@nestjs/common';
import { ChannelsService } from '../channels/channels.service';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [],
  controllers: [RequestsController],
  providers: [RequestsService, ChannelsService]
})
export class RequestsModule {}
