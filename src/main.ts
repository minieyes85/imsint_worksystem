import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
const ejslayouts = require('express-ejs-layouts');


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  
  //express-ejs-layouts 설정
  app.use(ejslayouts);
  app.set('layout', 'layouts/layoutDefault');  
  app.set("layout extractScripts", true);
  app.set("layout extractStyles", true);
  app.set("layout extractMetas", true);

  await app.listen(3000);
}
bootstrap();
