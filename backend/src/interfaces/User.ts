import mongoose, { Document } from 'mongoose';

export interface User {
  _id: mongoose.Schema.Types.ObjectId | string;
  username: string;
  email: string;
  password: string;
  shortId: string;
  status: 'ONLINE' | 'OFFLINE';
  friends: string[];
}

export interface UserDto {
  _id: mongoose.Schema.Types.ObjectId | string;
  username: string;
  email: string;
  password?: string;
}

export type UserDocument = User & Document;
