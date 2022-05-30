import { Document } from 'mongoose';

export interface Room {
  sender: string;
  receiver: string;
  createdBy: string;
}

export interface CreateRoom {
  userId: string;
  receiverId: string;
}

export type RoomDocument = Room & Document;
