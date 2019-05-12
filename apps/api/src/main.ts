/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import 'dotenv/config'
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}, 'Bootstrap'`);
  });
}

bootstrap();
