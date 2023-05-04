import { ApiProperty } from '@nestjs/swagger';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TransactionLog {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'id' })
    id: string;

    @Column()
    @ApiProperty({ description: '주소' })
    address: string;

    @Column()
    @ApiProperty({ description: '블록 해시' })
    blockHash: string;

    @Column()
    @ApiProperty({ description: '블록 번호' })
    blockNumber: number;

    @Column()
    @ApiProperty({ description: '데이타' })
    data: string;

    @Column()
    @ApiProperty({ description: '로그 인덱스' })
    logIndex: number;

    @Column()
    @ApiProperty({ description: '삭제됨' })
    removed: false;

    @Column({ nullable: true })
    @ApiProperty({ description: '토픽' })
    topics: string;

    @Column({ nullable: true })
    @ApiProperty({ description: '트랜잭션 해시' })
    transactionHash: string;

    @Column()
    @ApiProperty({ description: '트랜잭션 인덱스' })
    transactionIndex: number;

    @Column({ nullable: true })
    @ApiProperty({ description: '로그 아이디' })
    logId: string;

    static of(params: Partial<TransactionLog>): TransactionLog {
        const transactionLog = new TransactionLog();
        Object.assign(transactionLog, params);
        return transactionLog;
    }

}
