import { UserDocument } from 'interfaces/User';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userSchema = new Schema(
  {
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
      minlength: 5,
      select: false
    },
    shortId: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: Math.floor(Math.random() * 5),
      select: true
    }
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(paginate);

export const User = model<UserDocument, mongoose.PaginateModel<UserDocument>>(
  'User',
  userSchema
);
