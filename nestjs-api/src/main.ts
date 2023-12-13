import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import corsOptions from "./config/corsOptions"
import "dotenv/config"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.use(cookieParser('secret'));
  app.enableCors(corsOptions);
  await app.listen(5001);
}
bootstrap();
