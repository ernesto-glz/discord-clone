import { Module } from '@nestjs/common';
import { AuthModule } from './rest/auth/auth.module';
import { ChannelsModule } from './rest/channels/channels.module';
import { RequestsModule } from './rest/requests/requests.module';
import { UsersModule } from './rest/users/users.module';
import { WSGateway } from './ws/websocket';

@Module({
  imports: [AuthModule, UsersModule, ChannelsModule, RequestsModule],
  providers: [WSGateway]
})
export class AppModule {}
