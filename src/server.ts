import express, { json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import v1 from './routes/v1/rest-routes';
import mongoSanitize from 'express-mongo-sanitize';
import socketIo_v1 from './routes/v1/socket-routes';
import { apiErrorHandler } from './middlewares/ApiErrorHandler';
import { ApiError } from './errors/ApiError';

dotenv.config();

export class Server {
  private readonly express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(cors());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(mongoSanitize());
    this.express.use('/v1', v1);
    this.express.use((req, res, next) => {
      next(new ApiError(404, 'Not found'));
    });
    this.express.use(apiErrorHandler);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = http.createServer(this.express);
      socketIo_v1.attach(this.httpServer, { cors: { origin: '*' } });
      this.httpServer.listen(this.port, () => {
        console.log(
          ` Server is running at http://localhost:${
            this.port
          } in ${this.express.get('env')} mode`
        );
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
