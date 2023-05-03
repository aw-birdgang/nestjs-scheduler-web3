import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Web3Service} from "nest-web3";
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private blockRepository: Repository<Transaction>,
        private readonly web3Service: Web3Service
    ) {}

    private readonly logger = new Logger(TransactionService.name);

    async createTransactionInfo(transactions: Transaction[]): Promise<Transaction[]> {
        for (const transaction of transactions) {
            const insertEntry = Transaction.of(transaction);
            await this.blockRepository
                .createQueryBuilder()
                .insert()
                .into(Transaction)
                .values(insertEntry)
                .execute();
            this.logger.log('createTransactionInfo > insertEntry.id : ' + insertEntry.id);
        }
        return transactions;
    }
}
