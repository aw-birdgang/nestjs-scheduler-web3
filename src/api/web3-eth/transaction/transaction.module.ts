import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TransactionController } from './transaction.controller';
import {Transaction} from "./transaction.entity";
import { TransactionService } from './transaction.service';
import {TransactionReceipt} from "./transaction-receipt.entity";
import {TransactionLog} from "./transaction-log.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        TypeOrmModule.forFeature([TransactionReceipt]),
        TypeOrmModule.forFeature([TransactionLog]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService],
})
export class TransactionModule {}
