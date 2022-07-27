import { Entity } from '@discord/types';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
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

    const userFound = await User.findOne({ email }).select('+password');

    if (!userFound || !(await this.checkCredentials(password, userFound.password)))
      throw new UnauthorizedException('Email or password is invalid');
    else if (userFound.locked) 
      throw new BadRequestException('This account is locked!');

    this.createToken(app.users.secure(userFound), 200, response);
  }

  async registerUser(registerUserDto: RegisterUserDto, response: Response) {
    const { username, email, password } = registerUserDto;
    const userExists = await User.findOne({ email });

    if (userExists) 
      throw new ConflictException('Email already in use!');

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

    this.createToken(app.users.secure(created), 201, response);
  }

  async changeUsername(selfUser: Entity.UserTypes.Self, newUsername: string, password: string) {
    const self = await User.findById(selfUser.id).select('+password');

    if (!(await this.checkCredentials(password, self.password)))
      throw new UnauthorizedException('Password does not match.');

    const userExists = await User.findOne({
      username: newUsername,
      discriminator: selfUser.discriminator
    });

    const discriminator = userExists 
      ? await app.users.calcDiscriminator(selfUser.username)
      : selfUser.discriminator;
    
    await User.updateOne({ _id: selfUser.id }, { 
      username: newUsername,
      discriminator: discriminator.toString().padStart(4, '0') 
    });

    const user = await User.findById(selfUser.id);
    const secured = app.users.secure(user!);

    return {
      userId: selfUser.id,
      partialUser: secured
    };
  }

  async changePassword(selfUser: Entity.UserTypes.Self, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const self = await User.findById(selfUser.id).select('+password');

    if (!(await this.checkCredentials(currentPassword, self.password)))
      throw new UnauthorizedException('Password does not match.');
      
    const hashedPassword = await this.hashPassword(newPassword);
    await User.updateOne({ _id: selfUser.id }, { password: hashedPassword });

    return { response: 'Password changed successfully!' };
  }

  async hashPassword(password: string) {
    return await hash(password, this.saltRounds);
  }

  async checkCredentials(password: string, hashedPwd: string) {
    return await compare(password, hashedPwd);
  }

  private createToken(user: UserDocument, statusCode: number, res: Response) {
    const payload = { id: user.id };

    const token = sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '30d'
    });

    res.status(statusCode).json({ token });
  }
}
