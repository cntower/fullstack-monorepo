/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
// import 'dotenv/config'
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from "./app/app.module";
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('The posts API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('posts')
    .addTag('comments')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.API_PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}, 'Bootstrap'`);
  });
}

bootstrap();

