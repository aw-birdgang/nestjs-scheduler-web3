import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from './middleware/logger.middleware';
import {ConfigModule} from "./config";
import {ChainModule} from './api/chain/chain.module';

@Module({
  imports: [
    ConfigModule,
    ChainModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
