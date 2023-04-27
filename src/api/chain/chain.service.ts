import { Injectable } from '@nestjs/common';
import {Web3Service} from "nest-web3";
import { Block } from './block.entity';
import {Transaction} from "./transaction.entity";

@Injectable()
export class ChainService {
    constructor(
        private readonly web3Service: Web3Service
    ) {}

    async requestChainId(): Promise<number> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        return await client.eth.getChainId();
    }

    async requestBlockNumber(): Promise<number> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        return await client.eth.getBlockNumber()
    }

    async requestGasPrice(): Promise<string> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        return await client.eth.getGasPrice();
    }

    async requestBalance(address : string): Promise<string> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        return await client.eth.getBalance(address);
    }

    async requestGetBlock(blockNumber : number): Promise<Block> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        const transaction = await client.eth.getBlock(blockNumber);
        const block = new Block();
        block.number = transaction.number;
        block.hash = transaction.hash;
        block.parentHash = transaction.parentHash;
        block.nonce = transaction.nonce;
        block.gasLimit = transaction.gasLimit;
        return block;
    }

    async requestGetBlockTransactionCount(blockNumber : string): Promise<number> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        return await client.eth.getBlockTransactionCount(blockNumber);
    }

    async requestTransaction(transactionHash : string): Promise<Transaction> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        const resource = await client.eth.getTransaction(transactionHash);
        const transaction = new Transaction();
        try {
            transaction.hash = resource.hash;
            transaction.nonce = resource.nonce;
            transaction.blockHash = resource.blockHash;
            transaction.blockNumber = resource.blockNumber;
            transaction.transactionIndex = resource.transactionIndex;
            transaction.from = resource.from;
            transaction.to = resource.to;
            transaction.value = resource.value;
            transaction.gas = resource.gas;
            transaction.gasPrice = resource.gasPrice;
            transaction.input = resource.input;
        } catch (exception) {
        }
        return transaction;
    }

    // async requestPendingTransaction(transactionHash : string): Promise<Transaction[]> {
    //     const client = this.web3Service.getClient('eth'); // we are give name of client in config file
    //     const resource = await client.eth.getPendingTransactions();
    //     List[]<Transaction>
    //     const transactions = new Transaction();
    // }
}
