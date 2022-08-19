import { Document } from 'mongoose';
import { model, Schema } from 'mongoose';
import { Entity } from '@discord/types';
import { baseModelConfig } from 'src/config/model-config';
import { patterns } from 'src/shared/patterns';

export interface MessageDocument extends Document, Entity.Message {
  id: string;
}

export const Message = model<MessageDocument>('message', new Schema({
  _id: {
    type: String,
    required: [true, 'Id is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  sender: {
    type: String,
    required: [true, 'Sender is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  channelId: {
    type: String,
    required: [true, 'Channel id is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [4000, 'Content too long'],
  }
},
  { ...baseModelConfig, timestamps: true })
);
