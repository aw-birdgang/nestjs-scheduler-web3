import { Injectable } from '@nestjs/common';
import {Web3Service} from "nest-web3";
import { Block } from './block.entity';

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
}
