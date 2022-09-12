import { UserTypes } from '@dclone/types';
import { Body, Controller, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/shared/public.decorator';
import { User } from 'src/shared/user.decorator';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  loginUser(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    return this.authService.loginUser(loginUserDto, response);
  }

  @Post('/register')
  @Public()
  registerUser(@Body() registerUserDto: RegisterUserDto, @Res() response: Response) {
    return this.authService.registerUser(registerUserDto, response);
  }

  @Patch('/change-username')
  changeUsername(
    @Body() changeUsernameDto: ChangeUsernameDto,
    @User() selfUser: UserTypes.Self
  ) {
    const { newUsername, password } = changeUsernameDto;
    return this.authService.changeUsername(selfUser, newUsername, password);
  }

  @Patch('/change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @User() selfUser: UserTypes.Self
  ) {
    return this.authService.changePassword(selfUser, changePasswordDto);
  }
}
