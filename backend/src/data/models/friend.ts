import { model, Schema } from 'mongoose';
import { baseModelConfig } from 'config/constants/model-config';
import { Document } from 'mongoose';
import { Entity } from '@discord/types';
import { FriendDocument } from 'interfaces/Friend';

// export interface FriendDocument extends Document, Entity.Request {
//   id: string;
// }

export const FriendStatus = { FRIEND: 'FRIEND', PENDING: 'PENDING' };

export const Friend = model<FriendDocument>('friend', new Schema({
  _id: {
    type: String,
    required: true
  },
  from: {
    type: String,
    ref: 'user',
    required: true
  },
  to: {
    type: String,
    ref: 'user',
    required: true
  },
  status: {
    type: String,
    enum: Object.values(FriendStatus),
    default: 'PENDING'
  }
},
  { ...baseModelConfig })
);
