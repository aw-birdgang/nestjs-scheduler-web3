import {Controller, Get, HttpStatus, Param, ParseIntPipe, Request, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {ChainService} from "./chain.service";

@Controller('v1/chain')
@ApiTags('CHAIN API')
export class ChainController {
    constructor(
        private readonly chainService: ChainService) {
    }

    @Get('chainId')
    @ApiOperation({ summary: '체인 아이디 요청 API' })
    @ApiOkResponse({
        description: '체인 아이디 요청.',
    })
    async findChainId(
        @Request() req,
        @Res() res: Response
    ) {
        const response = await this.chainService.requestChainId(); // we are give name of client in config file
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
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
        const response = await this.chainService.requestBlockNumber(); // we are give name of client in config file
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Get('gasPrice')
    @ApiOperation({ summary: '가스 가격 요청 API' })
    @ApiOkResponse({
        description: '가스 가격 요청.',
    })
    async gasPrice(
        @Request() req,
        @Res() res: Response
    ) {
        const response = await this.chainService.requestGasPrice(); // we are give name of client in config file
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Get('balance/:address')
    @ApiOperation({ summary: '잔액 요청 API' })
    @ApiOkResponse({
        description: '잔액 요청.',
    })
    async getBalance(
        @Param('address') address: string,
        @Res() res: Response
    ) {
        const response = await this.chainService.requestBalance(address); // we are give name of client in config file
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Get('block/:number')
    @ApiOperation({ summary: '블록 정보 요청 API' })
    @ApiOkResponse({
        description: '블록 정보 요청.',
    })
    async getBlock(
        @Param('number', new ParseIntPipe()) number: number,
        @Res() res: Response
    ) {
        const response = await this.chainService.requestGetBlock(number); // we are give name of client in config file
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }
}
