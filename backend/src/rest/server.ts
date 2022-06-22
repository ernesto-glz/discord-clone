import express, { json, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import v1 from './routes/v1';
import mongoSanitize from 'express-mongo-sanitize';
import { apiErrorHandler } from '../middlewares/ApiErrorHandler';
import { ApiError } from '../errors/ApiError';

export class Server {
  private readonly express: express.Express;
  private readonly port = process.env.PORT || 4000;
  private httpServer?: http.Server;

  constructor() {
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
    this.express.use('/', () => {
      throw new ApiError(400, 'Invalid API version number');
    });
    this.express.use((req, res, next) => {
      next(new ApiError(404, 'Not found'));
    });
    this.express.use(apiErrorHandler);

    // listen
    this.httpServer = http.createServer(this.express);
    this.httpServer.listen(this.port, () => {
      deps.webSocket.io.attach(this.httpServer!);
      console.log(
        `API is running on port ${this.port} in ${this.express.get('env')} mode`
      );
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
