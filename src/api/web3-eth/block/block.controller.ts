import {Controller, Get, HttpStatus, Param, ParseIntPipe, Query, Request, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {BlockService} from "./block.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Block} from "./block.entity";
import {Repository} from "typeorm";

@Controller('v1/web3-eth/block')
@ApiTags('BLOCK API')
export class BlockController {
    constructor(
        @InjectRepository(Block)
        private blockRepository: Repository<Block>,
        private readonly blockService: BlockService) {
    }

    @Get()
    @ApiOperation({ summary: '모든 블록 조회 API' })
    @ApiOkResponse({
        description: '모든 블록을 조회 한다.',
        type: Block,
        isArray: true,
    })
    async findAccounts(
        @Query('take') take: number,
        @Query('page') page: number,
        @Res() res: Response,
    ) {
        const accounts = await this.blockService.findBlocks({ take, page });
        return res.status(HttpStatus.OK).json(instanceToPlain(accounts));
    }

    @Get('blockNumber')
    @ApiOperation({ summary: '블록 넘버 요청 API' })
    @ApiOkResponse({
        description: '블록 넘버 요청.',
    })
    async findBlockNumber(
        @Request() req,
        @Res() res: Response
    ) {
        const response = await this.blockService.requestBlockNumber();
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Get('block/:number')
    @ApiOperation({ summary: '블록 정보 요청 API' })
    @ApiOkResponse({
        description: '블록 정보 요청.',
    })
    async blockInfo(
        @Param('number', new ParseIntPipe()) number: number,
        @Res() res: Response
    ) {
        const response = await this.blockService.requestGetBlock(number);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

}
