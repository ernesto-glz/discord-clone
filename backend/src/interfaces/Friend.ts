import { Document } from 'mongoose';

export interface CreateRequest {
  from: string;
  username: string;
  discriminator: string;
}

export interface FriendRequest {
  from: string;
  to: string;
  friend_status: string;
}

export type FriendDocument = FriendRequest & Document;
