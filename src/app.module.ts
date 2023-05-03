import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from './middleware/logger.middleware';
import {ConfigModule} from "./config";
import { EtherModule } from './api/ether/ether.module';
import { Web3EthModule } from './api/web3-eth/web3-eth.module';
import {MySQLModule} from "./database/mysql.module";

@Module({
  imports: [
    MySQLModule,
    ConfigModule,
    EtherModule,
    Web3EthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
