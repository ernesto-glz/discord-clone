import { UserTypes } from '@discord/types';
import { Body, Controller, Delete, Get } from '@nestjs/common';
import { User } from 'src/shared/user.decorator';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete()
  deleteUser(@Body() deleteUserDto: DeleteUserDto, @User() selfUser: UserTypes.Self) {
    const { password } = deleteUserDto;
    return this.usersService.deleteUser(selfUser, password);
  }

  @Get('/entities')
  fetchEntities(@User() self: UserTypes.Self) {
    return this.usersService.fetchEntities(self);
  }
}
