import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Block} from "./block.entity";
import {Repository} from "typeorm";
import {Web3Service} from "nest-web3";
import {Pagination, PaginationOptions} from "../../../pagiante";
import {TransactionService} from "../transaction/transaction.service";

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(Block)
        private blockRepository: Repository<Block>,
        private readonly transactionService: TransactionService,
        private readonly web3Service: Web3Service
    ) {}

    private readonly logger = new Logger(BlockService.name);

    async findAll(): Promise<Block[]> {
        this.logger.debug('BlockService > findAll');
        return this.blockRepository.find();
    }

    async findBlocks(options: PaginationOptions): Promise<Pagination<Block>> {
        const { take, page } = options;
        const builder = this.blockRepository.createQueryBuilder('block');
        const total = await builder.getCount();
        const results = await builder
            .orderBy('number', 'DESC')
            .skip(take * (page - 1))
            .take(take)
            .getMany();
        return new Pagination<Block>({
            results,
            total,
        });
    }

    async requestBlockNumber(): Promise<number> {
        const client = this.web3Service.getClient('eth'); // we are give name of client in config file
        return await client.eth.getBlockNumber()
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
        block.difficulty = transaction.difficulty;
        const transactions = transaction.transactions as [];
        for (const transaction of transactions) {
            this.logger.log(transaction);
        }
        const response = await this.createBlockInfo(block);
        return response;
    }

    private async createBlockInfo(block: Block): Promise<Block> {
        const insertEntry = Block.of(block);
        await this.blockRepository
            .createQueryBuilder()
            .insert()
            .into(Block)
            .values(insertEntry)
            .execute();

        this.logger.log('createBlockInfo > insertEntry.id : ' + insertEntry.id);
        return insertEntry;
    }

}
