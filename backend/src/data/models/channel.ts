import { ChannelTypes } from 'config/constants/status';
import { ChannelDocument } from 'interfaces/Channel';
import { Schema, model } from 'mongoose';
import { useId } from 'utils/utils';

export const Channel = model<ChannelDocument>('channel', new Schema({
  _id: {
    type: String,
    required: true
  },
  guildId: {
    type: String
  },
  createdBy: {
    type: String,
    required: true
  },
  firstMessageId: {
    type: String
  },
  lastMessageId: {
    type: String
  },
  position: {
    type: Number
  },
  type: {
    type: String,
    enum: Object.values(ChannelTypes),
    required: true
  },
  userIds: {
    type: [String],
    default: []
  }
}, { versionKey: false, toJSON: { getters: true } })
  .method('toClient', useId)
)
