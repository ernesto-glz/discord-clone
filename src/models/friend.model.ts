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