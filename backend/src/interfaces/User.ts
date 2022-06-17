import { Document } from 'mongoose';

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  shortId: string;
  status: 'ONLINE' | 'OFFLINE';
  guildIds: string[];
  hiddenDMChannels: string[];
}

export interface UserDto {
  _id: string;
  username: string;
  email: string;
  password?: string;
}

export type UserDocument = User & Document;
