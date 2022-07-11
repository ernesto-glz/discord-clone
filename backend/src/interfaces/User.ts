import { Document } from 'mongoose';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  discriminator: string;
  status: 'ONLINE' | 'OFFLINE';
  avatar: string;
  guildIds: string[];
  activeDMCS: string[];
  lastReadMessageIds: any;
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export type UserDocument = User & Document;
