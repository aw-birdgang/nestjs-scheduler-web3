import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Block {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'id' })
    id: string;

    @Column()
    @ApiProperty({ description: '블록 넘버' })
    number: number;

    @Column({ unique: true })
    @ApiProperty({ description: '해시' })
    hash: string;

    @Column()
    @ApiProperty({ description: '부모 해시' })
    parentHash: string;

    @Column()
    @ApiProperty({ description: '논스' })
    nonce: string;

    //SHA3 of the uncles data in the block.
    @Column()
    @ApiProperty({ description: '블록 엉클 데이' })
    sha3Uncles: string;

    //The bloom filter for the logs of the block. null if a pending block.
    @Column()
    @ApiProperty({ description: '블록 로그' })
    logsBloom: string;

    //32 Bytes - String: The root of the transaction trie of the block.
    @Column()
    @ApiProperty({ description: '트랜잭션 루트' })
    transactionsRoot: string;

    //32 Bytes - String: The root of the final state trie of the block.
    @Column()
    @ApiProperty({ description: '블록 상태 루트' })
    stateRoot: string;

    //String: The address of the beneficiary to whom the mining rewards were given.
    @Column()
    @ApiProperty({ description: '마이너' })
    miner: string;

    //String: Integer of the difficulty for this block.
    @Column()
    @ApiProperty({ description: '난이도' })
    difficulty: number;

    //String: Integer of the total difficulty of the chain until this block.
    @Column()
    @ApiProperty({ description: '총 복잡도' })
    totalDifficulty: string;

    //Number: Integer the size of this block in bytes.
    @Column()
    @ApiProperty({ description: '사이즈' })
    size: number;

    //String: The “extra data” field of this block.
    @Column()
    @ApiProperty({ description: '기타 데이타' })
    extraData: string;

    //Number: The maximum gas allowed in this block.
    @Column()
    @ApiProperty({ description: '최대 가스' })
    gasLimit: number;

    //Number: The total used gas by all transactions in this block.
    @Column()
    @ApiProperty({ description: '사용된 가스' })
    gasUsed: number;

    //Number: The unix timestamp for when the block was collated.
    @Column()
    @ApiProperty({ description: '계정 번호' })
    timestamp: number;

    static of(params: Partial<Block>): Block {
        const block = new Block();
        Object.assign(block, params);
        return block;
    }

}
