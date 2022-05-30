import { dbConnect } from 'config/mongodb';
import mongoose from 'mongoose';
import { Server } from './server';

export class BackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '4000';
    this.server = new Server(port);
    await dbConnect();
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await mongoose.connection.close();
    return this.server?.stop();
  }
}
