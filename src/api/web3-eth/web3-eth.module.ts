import { Module } from '@nestjs/common';
import {Web3Module} from "nest-web3";
import { Web3EthController } from './web3-eth.controller';
import { Web3EthService } from './web3-eth.service';
import {BlockModule} from "./block/block.module";
import {TransactionModule} from "./transaction/transaction.module";

@Module({
    imports: [
        Web3Module.forRoot({
            name: 'eth',
            url: 'https://sepolia.infura.io/v3/a9829e96d2274a24815abf08f981ae32',
        }),
        BlockModule,
        TransactionModule,
    ],
    controllers: [Web3EthController],
    providers: [Web3EthService],
})
export class Web3EthModule {}
