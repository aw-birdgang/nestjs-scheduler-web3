import { Module } from '@nestjs/common';
import { EthersModule, SEPOLIA_NETWORK } from "nestjs-ethers";
import { ConfigModule, ConfigService } from "../../../config";
import { Erc20Controller } from "./erc20.controller";
import { Erc20Service } from "./erc20.service";

@Module({
  imports: [
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        network: SEPOLIA_NETWORK,
        custom: configService.get('INFURA_PROJECT_ID'),
      }),
    }),
    ConfigModule,
  ],
  controllers: [Erc20Controller],
  providers: [Erc20Service],
})
export class Erc20Module {}
