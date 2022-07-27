import { Entity } from '@discord/types';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/shared/user.decorator';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { DeleteRequestDto } from './dto/delete-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto, @User() selfUser: Entity.UserTypes.Self) {
    return this.requestsService.create(createRequestDto, selfUser);
  }

  @Delete(':requestId')
  delete(@User() selfUser: Entity.UserTypes.Self, @Param() params: DeleteRequestDto) {
    return this.requestsService.delete(params.requestId, selfUser.id);
  }

  @Put(':requestId')
  accept(@User() selfUser: Entity.UserTypes.Self, @Param() params: AcceptRequestDto) {
    return this.requestsService.accept(params.requestId, selfUser.id);
  }
}
