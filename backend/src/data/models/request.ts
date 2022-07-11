import { model, Schema, Document } from 'mongoose';
import { baseModelConfig } from 'config/constants/model-config';
import { Entity } from '@discord/types';

export interface RequestDocument extends Document, Entity.Request {
  id: string;
}

export const Request = model<RequestDocument>('request', new Schema({
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
  }
},
  { ...baseModelConfig })
);
