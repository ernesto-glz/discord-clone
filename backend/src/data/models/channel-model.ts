import { Schema, model, Document } from 'mongoose';
import { Entity } from '@dclone/types';
import { baseModelConfig } from 'src/config/model-config';
import { patterns } from 'src/shared/patterns';

export interface ChannelDocument extends Document, Entity.Channel {
  id: string;
}

export const Channel = model<ChannelDocument>('channel', new Schema({
  _id: {
    type: String,
    required: [true, 'Id is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  name: {
    type: String,
    maxlength: [32, 'Name is too long']
  },
  guildId: {
    type: String,
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  createdBy: {
    type: String,
    required: [true, 'CreatedBy is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  lastMessageId: {
    type: String,
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    validate: [patterns.channelType, 'Invalid type']
  },
  userIds: {
    type: [String],
    default: []
  }
}, 
  { ...baseModelConfig })
);
