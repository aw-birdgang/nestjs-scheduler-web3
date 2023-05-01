import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from './middleware/logger.middleware';
import {ConfigModule} from "./config";
import {ChainModule} from './api/chain/chain.module';
import { EtherModule } from './api/ether/ether.module';

@Module({
  imports: [
    ConfigModule,
    ChainModule,
    EtherModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
