import { model, Schema, Document } from 'mongoose';
import { Entity } from '@discord/types';
import { baseModelConfig } from 'src/config/model-config';
import { patterns } from 'src/shared/patterns';

export interface RequestDocument extends Document, Entity.Request {
  id: string;
}

export const Request = model<RequestDocument>('request', new Schema({
  _id: {
    type: String,
    required: [true, 'Id is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  from: {
    type: String,
    ref: 'user',
    required: [true, 'From is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  to: {
    type: String,
    ref: 'user',
    required: [true, 'To is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  }
},
  { ...baseModelConfig })
);
