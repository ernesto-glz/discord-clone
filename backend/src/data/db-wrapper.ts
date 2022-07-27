import { Document } from 'mongoose';

export default abstract class DBWrapper<K, T extends Document> {
  save(savedType: T) {
    return savedType?.save();
  }
}