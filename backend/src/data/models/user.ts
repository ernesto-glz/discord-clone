import { baseModelConfig } from 'config/constants/model-config';
import { UserDocument } from 'interfaces/User';
import { Schema, model } from 'mongoose';

const UserStatus = { ONLINE: 'ONLINE', OFFLINE: 'OFFLINE' };

export const User = model<UserDocument>('user', new Schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
    minlength: 5
  },
  discriminator: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  guildIds: {
    type: [String]
  },
  lastReadMessageIds: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: 'OFFLINE'
  },
  activeDMCS: {
    type: [String],
    default: []
  }
},
  { ...baseModelConfig })
);
