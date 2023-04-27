import { Module } from '@nestjs/common';
import {Web3Module} from "nest-web3";
import {ChainController} from "./chain.controller";
import {ChainService} from "./chain.service";

@Module({
    imports: [
        Web3Module.forRoot({
            name: 'eth',
            url: 'https://sepolia.infura.io/v3/a9829e96d2274a24815abf08f981ae32',
        }),
    ],
    controllers: [ChainController],
    exports: [ChainService],
    providers: [ChainService],
})
export class ChainModule {}
