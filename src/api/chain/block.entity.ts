import { ApiProperty } from '@nestjs/swagger';

export class Block {
    @ApiProperty({ description: 'id' })
    id: number;

    @ApiProperty({ description: '블록 넘버' })
    number: number;

    @ApiProperty({ description: '해시' })
    hash: string;

    @ApiProperty({ description: '개인 키' })
    parentHash: string;

    @ApiProperty({ description: '공개 키' })
    nonce: string;

    @ApiProperty({ description: '계정 번호' })
    sha3Uncles: string;

    @ApiProperty({ description: '계정 번호' })
    logsBloom: string;

    @ApiProperty({ description: '계정 번호' })
    transactionsRoot: string;

    @ApiProperty({ description: '계정 번호' })
    stateRoot: string;

    @ApiProperty({ description: '계정 번호' })
    miner: string;

    @ApiProperty({ description: '계정 번호' })
    difficulty: string;

    @ApiProperty({ description: '계정 번호' })
    totalDifficulty: string;

    @ApiProperty({ description: '계정 번호' })
    size: number;

    @ApiProperty({ description: '계정 번호' })
    extraData: string;

    @ApiProperty({ description: '계정 번호' })
    gasLimit: number;

    @ApiProperty({ description: '계정 번호' })
    gasUsed: number;

    @ApiProperty({ description: '계정 번호' })
    timestamp: number;


    static of(params: Partial<Block>): Block {
        const block = new Block();
        Object.assign(block, params);
        return block;
    }

}
