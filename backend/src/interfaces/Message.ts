import { Document } from 'mongoose';

export interface Message {
  id: string;
  sender: string;
  channelId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MessageDocument = Message & Document;
