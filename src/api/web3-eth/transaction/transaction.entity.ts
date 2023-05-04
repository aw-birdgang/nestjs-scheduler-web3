import { ApiProperty } from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'id' })
    id: string;

    // 32 Bytes - String: Hash of the transaction.
    @Column({ unique: true })
    @ApiProperty({ description: '해시' })
    hash: string;

    //nonce - Number: The number of transactions made by the sender prior to this one.
    @Column()
    @ApiProperty({ description: '논스' })
    nonce: number;

    //blockHash 32 Bytes - String: Hash of the block where this transaction was in. null if pending.
    @Column({ nullable: true })
    @ApiProperty({ description: '블록 해시' })
    blockHash: string;

    //blockNumber - Number: Block number where this transaction was in. null if pending.
    @Column({ nullable: true })
    @ApiProperty({ description: '블록 번호' })
    blockNumber: number;

    //transactionIndex - Number: Integer of the transactions index position in the block. null if pending.
    @Column({ nullable: true })
    @ApiProperty({ description: '트랜잭션 인덱스' })
    transactionIndex: number;

    //from - String: Address of the sender.
    @Column()
    @ApiProperty({ description: '보내는 사람' })
    from: string;

    //to - String: Address of the receiver. null if it’s a contract creation transaction.
    @Column({ nullable: true })
    @ApiProperty({ description: '받는 사람' })
    to: string;

    //value - String: Value transferred in wei.
    @Column()
    @ApiProperty({ description: '값' })
    value: string;

    //value - String: Value transferred in wei.
    @Column()
    @ApiProperty({ description: '가스' })
    gas: number;

    //gasPrice - String: Gas price provided by the sender in wei.
    @Column()
    @ApiProperty({ description: '가스 가격' })
    gasPrice: string;

    //input - String: The data sent along with the transaction.
    @Column()
    @ApiProperty({ description: '입력' })
    input: string;

    static of(params: Partial<Transaction>): Transaction {
        const transaction = new Transaction();
        Object.assign(transaction, params);
        return transaction;
    }

}
