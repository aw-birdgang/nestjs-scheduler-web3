import { ApiProperty } from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TransactionReceipt {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'id' })
    id: string;

    //TRUE if the transaction was successful, FALSE if the EVM reverted the transaction.
    @Column()
    @ApiProperty({ description: '상태' })
    status: boolean;

    //32 Bytes - String: Hash of the block where this transaction was in.
    @Column()
    @ApiProperty({ description: '블록 해시' })
    blockHash: string;

    //Number (or hex String): Block number where this transaction was in.
    @Column()
    @ApiProperty({ description: '블록 번호' })
    blockNumber: number;

    //32 Bytes - String: Hash of the transaction.
    @Column({ nullable: true })
    @ApiProperty({ description: '트랜잭션 해시' })
    transactionHash: string;

    //Number (or hex String): Integer of the transactions index position in the block.
    @Column()
    @ApiProperty({ description: '트랜잭션 인덱스' })
    transactionIndex: number;

    //from - String: Address of the sender.
    @Column()
    @ApiProperty({ description: '보내는 사람' })
    from: string;

    //to - String: Address of the receiver. null when it’s a contract creation transaction.
    @Column({ nullable: true })
    @ApiProperty({ description: '받는 사람' })
    to: string;

    //String: The contract address created, if the transaction was a contract creation, otherwise null.
    @Column({ nullable: true })
    @ApiProperty({ description: '계약 주소' })
    contractAddress: string;

    //Number (or hex String): The total amount of gas used when this transaction was executed in the block.
    @Column()
    @ApiProperty({ description: '누적 가스 사용' })
    cumulativeGasUsed: number;

    //Number (or hex String): The amount of gas used by this specific transaction alone.
    @Column()
    @ApiProperty({ description: '가스 사용' })
    gasUsed: number;

    //Number (or hex String): The actual value per gas deducted from the senders account. Before EIP-1559, this is equal to the transaction’s gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas).
    @Column()
    @ApiProperty({ description: '유효 가스 가격' })
    effectiveGasPrice: number;

    static of(params: Partial<TransactionReceipt>): TransactionReceipt {
        const transactionReceipt = new TransactionReceipt();
        Object.assign(transactionReceipt, params);
        return transactionReceipt;
    }

}
