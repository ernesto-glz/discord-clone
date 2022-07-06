import { Document } from 'mongoose';

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  discriminator: string;
  status: 'ONLINE' | 'OFFLINE';
  avatar: string;
  guildIds: string[];
  hiddenDMChannels: string[];
  lastReadMessageIds: any;
}

export interface UserDto {
  _id: string;
  username: string;
  email: string;
  password?: string;
}

export type UserDocument = User & Document;
