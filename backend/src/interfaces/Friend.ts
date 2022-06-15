import { Document } from 'mongoose';

export interface CreateFriendRequest {
  from: string;
  toUsername: string;
  toShortId: string;
}

export interface FriendRequest {
  from: string;
  to: string;
  friend_status: string;
}

export type FriendDocument = FriendRequest & Document;
