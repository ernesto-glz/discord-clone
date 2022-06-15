import { User } from './user.model';

export interface CreateFriendRequest {
  toUsername: string;
  toShortId: string;
}

export interface PendingRequest {
  _id: string;
  from: string;
  to: string;
  toUser?: any;
  fromUser?: any;
}

export interface FriendRequest {
  _id: string;
  from: User;
  to: User;
}
