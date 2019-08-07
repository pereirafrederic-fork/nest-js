import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/*

logger globale =>
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(3000);
*/

/*
HttpException globale =>
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
  }
  

*/
