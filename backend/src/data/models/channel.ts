import { baseModelConfig } from 'config/constants/model-config';
import { Schema, model, Document } from 'mongoose';
import { Entity } from '@discord/types';

export interface ChannelDocument extends Document, Entity.Channel {
  id: string;
}
const ChannelTypes = { DM: 'DM', GUILD_TEXT: 'GUILD_TEXT', GUILD_VOICE: 'GUILD_VOICE' };

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
  lastMessageId: {
    type: String
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
}, 
  { ...baseModelConfig })
)
