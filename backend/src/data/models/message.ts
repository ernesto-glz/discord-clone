import { Document } from 'mongoose';
import { baseModelConfig } from 'config/constants/model-config';
import { model, Schema, PaginateModel as Paginate } from 'mongoose';
import { Entity } from '@discord/types';
import paginate from 'mongoose-paginate-v2';

export interface MessageDocument extends Document, Entity.Message {
  id: string;
}

export const Message = model<MessageDocument, Paginate<MessageDocument>>('message', new Schema({
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
  },
  message_reference: {
    type: String
  }
},
  { ...baseModelConfig, timestamps: true })
  .plugin(paginate)
);
