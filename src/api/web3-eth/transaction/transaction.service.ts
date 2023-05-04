import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Web3Service} from "nest-web3";
import { Transaction } from './transaction.entity';
import {TransactionReceipt} from "./transaction-receipt.entity";
import { TransactionLog } from './transaction-log.entity';
import {OptionsRequestDto} from "./dto/options-request.dto";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(TransactionReceipt)
        private transactionReceiptRepository: Repository<TransactionReceipt>,
        @InjectRepository(TransactionLog)
        private transactionLogRepository: Repository<TransactionLog>,
        private readonly web3Service: Web3Service
    ) {}

    private readonly logger = new Logger(TransactionService.name);

    async createTransactionInfo(transactions: Transaction[]): Promise<Transaction[]> {
        // for (const transaction of transactions) {
        //     this.logger.log(transaction);
        //     const insertEntry = Transaction.of(transaction);
        //     await this.blockRepository
        //         .createQueryBuilder()
        //         .insert()
        //         .into(Transaction)
        //         .values(insertEntry)
        //         .execute();
        //     this.logger.log('createTransactionInfo > insertEntry.id : ' + insertEntry.id);
        // }
        return transactions;
    }

    async requestTransactions(transactionHash : string): Promise<Transaction> {
        const client = this.web3Service.getClient('eth');
        const response = await client.eth.getTransaction(transactionHash);
        this.logger.log("requestTransactions : " + response);
        const transaction = new Transaction();
        transaction.hash = response.hash;
        transaction.nonce = response.nonce;
        transaction.blockHash = response.blockHash;
        transaction.transactionIndex = response.transactionIndex;
        transaction.from = response.from;
        transaction.to = response.to;
        transaction.value = response.value;
        transaction.gas = response.gas;
        transaction.gasPrice = response.gasPrice;
        transaction.input = response.input;
        this.logger.log(transaction.toString());
        const insertEntry = Transaction.of(transaction);
        await this.transactionRepository
            .createQueryBuilder()
            .insert()
            .into(Transaction)
            .values(insertEntry)
            .execute();
        return transaction;
    }


    async requestTransactionsReceipt(transactionHash : string): Promise<TransactionReceipt> {
        const client = this.web3Service.getClient('eth');
        const response = await client.eth.getTransactionReceipt(transactionHash);
        this.logger.log("requestTransactions : " + response);
        const transactionReceipt = new TransactionReceipt();
        transactionReceipt.status = response.status;
        transactionReceipt.blockHash = response.blockHash;
        transactionReceipt.blockNumber = response.blockNumber;
        transactionReceipt.transactionHash = response.transactionHash;
        transactionReceipt.transactionIndex = response.transactionIndex;
        transactionReceipt.from = response.from;
        transactionReceipt.to = response.to;
        transactionReceipt.contractAddress = response.contractAddress;
        transactionReceipt.cumulativeGasUsed = response.cumulativeGasUsed;
        transactionReceipt.gasUsed = response.gasUsed;
        transactionReceipt.effectiveGasPrice = response.effectiveGasPrice;
        this.logger.log(transactionReceipt.toString());
        const insertEntry = Transaction.of(transactionReceipt);
        await this.transactionReceiptRepository
            .createQueryBuilder()
            .insert()
            .into(TransactionReceipt)
            .values(insertEntry)
            .execute();
        return transactionReceipt;
    }


    async requestTransactionsReceiptLogs(transactionHash : string): Promise<string[]> {
        const client = this.web3Service.getClient('eth');
        const blockTransaction = await client.eth.getTransactionReceipt(transactionHash);
        this.logger.log(blockTransaction);
        const logs = blockTransaction.logs as [];
        const transactionLog = new TransactionLog();
        return logs;
    }


    async requestPastLogs(requestDto : OptionsRequestDto): Promise<TransactionLog[]> {
        const client = this.web3Service.getClient('eth');
        const pastLogs = await client.eth.getPastLogs(requestDto);
        this.logger.log(pastLogs);
        for (const log of pastLogs) {
            const transactionLog = new TransactionLog();
            transactionLog.data = log.data;
            transactionLog.topics = "log.topics";
            transactionLog.logIndex = log.logIndex;
            transactionLog.transactionHash = log.transactionHash;
            transactionLog.blockHash = log.blockHash;
            transactionLog.blockNumber = log.blockNumber;
            transactionLog.address = log.address;
            const insertEntry = TransactionLog.of(transactionLog);
            await this.transactionLogRepository
                .createQueryBuilder()
                .insert()
                .into(TransactionLog)
                .values(insertEntry)
                .execute();
        }
        return await this.transactionLogRepository.find();
    }

}
