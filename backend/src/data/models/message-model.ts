import { Document } from 'mongoose';
import { model, Schema } from 'mongoose';
import { Entity } from '@discord/types';
import { baseModelConfig } from 'src/config/model-config';

export interface MessageDocument extends Document, Entity.Message {
  id: string;
}

export const Message = model<MessageDocument>('message', new Schema({
  _id: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
  { ...baseModelConfig, timestamps: true })
);
