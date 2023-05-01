import { Module } from '@nestjs/common';
import { EtherController } from "./ether.controller";
import { EtherService } from "./ether.service";
import { Erc20Module } from './erc20/erc20.module';
import { ConfigModule } from "../../config";

@Module({
  imports: [
    ConfigModule,
    Erc20Module,
  ],
  controllers: [EtherController],
  providers: [EtherService],
})
export class EtherModule {}
