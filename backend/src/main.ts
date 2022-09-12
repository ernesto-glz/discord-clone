import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import { AuthGuard } from './shared/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { delay } from './utils/utilts';
import { execSync } from 'child_process';
import helmet from 'helmet';
import './modules/logger';
import './modules/app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const isProd = process.env.NODE_ENV === 'production';
  const reflector = app.get(Reflector);

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('v1');
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.useStaticAssets(join(__dirname, '../assets'), { prefix: '/assets' });

  // Temp fix hot reload broke ws-sessions (only for development)
  !isProd && (await delay(1000));

  if (!process.env.MONGO_URI) {
    logger.warn('Some environment variables have not been declared.');
  }

  try {
    const config = isProd ?  {
      authSource: 'admin',
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
      }
    } : {};
    await connect(process.env.MONGO_URI, config)
    logger.info(`Connected to database ${process.env.MONGO_URI}`);
  } catch (error) {
    logger.error(error.message ?? 'Unable to connect to db')
  }

  // Create upload folder if no exists.
  try {
    execSync(`mkdir -p $ ${resolve('./assets/upload')} 2>> /dev/null`);
  } catch {}

  await app
    .listen(process.env.PORT ?? 4000)
    .then(() => logger.info(`API is running on port ${process.env.PORT}`))
    .catch((error) => logger.error(error));
}
bootstrap();
