import { model, Schema } from 'mongoose';
import { FriendStatus } from 'config/constants/status';
import { FriendDocument } from 'interfaces/Friend';
import { useId } from 'utils/utils';

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
  { versionKey: false, toJSON: { getters: true } })
  .method('toClient', useId)
);
