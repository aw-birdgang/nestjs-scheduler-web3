import {Injectable, Logger} from '@nestjs/common';
import {Web3Service} from "nest-web3";
import {Transaction} from "./transaction/transaction.entity";

@Injectable()
export class Web3EthService {
    constructor(
        private readonly web3Service: Web3Service
    ) {}

    private readonly logger = new Logger(Web3EthService.name);

    async requestChainId(): Promise<number> {
        const client = this.web3Service.getClient('eth');
        return await client.eth.getChainId();
    }

    async requestGasPrice(): Promise<string> {
        const client = this.web3Service.getClient('eth');
        return await client.eth.getGasPrice();
    }

    async requestBalance(address : string): Promise<string> {
        const client = this.web3Service.getClient('eth');
        return await client.eth.getBalance(address);
    }

    async requestGetBlockTransactionCount(blockNumber : string): Promise<number> {
        const client = this.web3Service.getClient('eth');
        return await client.eth.getBlockTransactionCount(blockNumber);
    }

    async requestTransaction(transactionHash : string): Promise<Transaction> {
        const client = this.web3Service.getClient('eth');
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
    //     const client = this.web3Service.getClient('eth');
    //     const resource = await client.eth.getPendingTransactions();
    //     List[]<Transaction>
    //     const transactions = new Transaction();
    // }

    async contractInfo(contractAddress : string) {
        const client = this.web3Service.getClient('eth');
        // const myContract = new client.eth.Contract(
        //   abijson as AbiItem,
        //   contractAddress,
        // );
        // const tx = myContract.methods.setData(1);
        // const gas = await tx.estimateGas({from: client});
        // const gasPrice = await client.eth.getGasPrice();
        // const data = tx.encodeABI();
        // this.logger.log(tx, gas, gasPrice, data);
    }
}
