import { Module, NestModule, RequestMethod, MiddlewareConsumer, HttpExceptionFilter } from '@nestjs/common';
import * as helmet from "helmet";
import * as cors from "cors";

import { APP_FILTER } from '@nestjs/core';


import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

//middleware
import { LoggerMiddleware } from './common/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
//  providers: [AppService, CatsService],
 providers: [AppService, CatsService, {
     provide: APP_FILTER,
     useClass: HttpExceptionFilter,
   }]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      //.apply(LoggerMiddleware)
      .apply(cors(), helmet(), LoggerMiddleware)


      .exclude(
          { path: 'cats/:id', method: RequestMethod.GET },
          { path: 'cats', method: RequestMethod.POST }
      )
            //.forRoutes({ path: 'cats', method: RequestMethod.GET });
      .forRoutes(CatsController);
  }
}
