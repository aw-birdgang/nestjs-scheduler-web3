import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Block} from "./block.entity";
import {BlockController} from "./block.controller";
import {BlockService} from "./block.service";
import {TransactionModule} from "../transaction/transaction.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Block]),
        TransactionModule
    ],
    controllers: [BlockController],
    providers: [BlockService],
})
export class BlockModule {}
