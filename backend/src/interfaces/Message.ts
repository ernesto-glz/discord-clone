import { Document } from 'mongoose';

export interface Message {
  _id: string;
  sender: string;
  channelId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MessageDocument = Message & Document;
