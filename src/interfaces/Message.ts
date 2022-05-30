import { Document } from 'mongoose';

export interface Message {
  sender: string;
  roomId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type MessageDocument = Message & Document;
