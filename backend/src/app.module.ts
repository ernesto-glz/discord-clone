import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './core/exception-filter';
import { AuthModule } from './rest/auth/auth.module';
import { ChannelsModule } from './rest/channels/channels.module';
import { RequestsModule } from './rest/requests/requests.module';
import { UsersModule } from './rest/users/users.module';
import { WSGateway } from './ws/websocket';

@Module({
  imports: [AuthModule, UsersModule, ChannelsModule, RequestsModule],
  providers: [WSGateway, { provide: 'APP_FILTER', useClass: AllExceptionsFilter }, AppService],
  controllers: [AppController]
})
export class AppModule {}
