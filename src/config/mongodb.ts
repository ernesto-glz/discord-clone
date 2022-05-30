import mongoose from 'mongoose';

export function dbConnect() {
  const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
  return new Promise((resolve, reject) => {
    mongoose.connect(
      DB_URI,
      {
        dbName: 'chat-app'
      },
      (error) => {
        if (error) {
          reject(error);
        }
        console.log('> Connected with db');
        resolve('> Connected with db');
      }
    );
  });
}
