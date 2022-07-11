import { Document } from 'mongoose';
import { Entity } from '@discord/types';

export interface FriendRequest {
  from: string;
  to: string;
  status: string;
  type: Entity.RequestTypes.Type;
}

export type FriendDocument = FriendRequest & Document;
