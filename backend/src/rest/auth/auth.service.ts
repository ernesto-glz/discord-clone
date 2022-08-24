import { UserTypes } from '@dclone/types';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Response } from 'express';
import { User, UserDocument } from 'src/data/models/user-model';
import { generateSnowflake } from 'src/utils/snowflake';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  async loginUser(loginUserDto: LoginUserDto, response: Response) {
    const { email, password } = loginUserDto;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await this.checkCredentials(password, user.password)))
      throw new UnauthorizedException(['Email or password is invalid']);
    else if (user.locked) 
      throw new BadRequestException(['This account is locked!']);

    this.createToken(user.toObject(), 200, response);
  }

  async registerUser(registerUserDto: RegisterUserDto, response: Response) {
    const { username, email, password } = registerUserDto;
    const userExists = await User.findOne({ email });

    if (userExists) 
      throw new ConflictException(['Email is already registered']);

    const hashedPassword = await this.hashPassword(password);
    const discriminator = await app.users.calcDiscriminator(username);

    const created = await User.create({
      _id: generateSnowflake(),
      username,
      password: hashedPassword,
      email,
      avatar: Math.floor(Math.random() * 5).toString(),
      discriminator: discriminator.toString().padStart(4, '0')
    });

    this.createToken(created.toObject(), 201, response);
  }

  async changeUsername(selfUser: UserTypes.Self, newUsername: string, password: string) {
    const self = await User.findById(selfUser.id).select('+password');

    if (!(await this.checkCredentials(password, self.password)))
      throw new UnauthorizedException(['Password does not match.']);

    const userExists = await User.findOne({
      username: newUsername,
      discriminator: selfUser.discriminator
    });

    const discriminator = userExists 
      ? await app.users.calcDiscriminator(selfUser.username)
      : selfUser.discriminator;
    
    self.username = newUsername;
    self.discriminator = discriminator.toString().padStart(4, '0');
    await self.save();

    return {
      userId: selfUser.id,
      partialUser: app.users.secure(self)
    };
  }

  async changePassword(selfUser: UserTypes.Self, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const self = await User.findById(selfUser.id).select('+password');

    if (!(await this.checkCredentials(currentPassword, self.password)))
      throw new UnauthorizedException(['Password does not match.']);
      
    const hashedPassword = await this.hashPassword(newPassword);
    self.password = hashedPassword;
    await self.save();

    return { response: 'Password changed successfully!' };
  }

  async hashPassword(password: string) {
    return await hash(password, this.saltRounds);
  }

  async checkCredentials(password: string, hashedPwd: string) {
    return await compare(password, hashedPwd);
  }

  private async createToken(user: Partial<UserTypes.Self>, statusCode: number, res: Response) {
    const payload = { id: user.id };
    res.status(statusCode).json({ token: await app.users.createToken(payload) });
  }
}
