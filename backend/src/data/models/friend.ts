import { model, Schema } from 'mongoose';
import { FriendDocument } from 'interfaces/Friend';
import { baseModelConfig } from 'config/constants/model-config';

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
    default: FriendStatus.PENDING
  }
},
  { ...baseModelConfig })
);
