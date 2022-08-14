import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import { AuthGuard } from './shared/auth.guard';
import { defineAppGlobals } from './modules/app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { delay } from './utils/utilts';
import { execSync } from 'child_process';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('v1');
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.useStaticAssets(join(__dirname, '../assets'), { prefix: '/assets' });

  // Temp fix hot reload broke ws-sessions (only for development)
  await delay(1000);

  if (!process.env.JWT_SECRET_KEY || !process.env.MONGO_URI) {
    console.log('Some environment variables have not been declared.');
    process.kill(1);
  }

  connect(process.env.MONGO_URI)
    .then(() => console.log(`Connected to database ${process.env.MONGO_URI}`))
    .catch((error) => console.log(error.message ?? 'Unable to connect to db'));

  defineAppGlobals();

  // Create upload folder if no exists.
  try {
    execSync(`mkdir -p $ ${resolve('./assets/upload')} 2>> /dev/null`);
  } catch {}

  await app
    .listen(process.env.PORT ?? 4000)
    .then(() => console.log(`API is running on port ${process.env.PORT}`))
    .catch((error) => console.log(error));
}
bootstrap();
