import { Document } from 'mongoose';

export interface Message {
  sender: string;
  channelId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MessageDocument = Message & Document;
