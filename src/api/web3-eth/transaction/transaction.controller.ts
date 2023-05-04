import {Body, Controller, Get, HttpStatus, Logger, Param, ParseIntPipe, Post, Request, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TransactionService} from "./transaction.service";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {OptionsRequestDto} from "./dto/options-request.dto";

@Controller('v1/web3-eth/transaction')
@ApiTags('TRANSACTION API')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService) {
    }

    private readonly logger = new Logger(TransactionController.name);

    @Get(':hash')
    @ApiOperation({ summary: '트랜잭션 정보 요청 API' })
    @ApiOkResponse({
        description: '트랜잭션 정보 요청.',
    })
    async transactionByHash(
        @Param('hash') hash: string,
        @Res() res: Response
    ) {
        this.logger.log("findTransactionByHash > hash : " + hash);
        const response = await this.transactionService.requestTransactions(hash);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Get('receipt/:hash')
    @ApiOperation({ summary: '트랜잭션 반환 정보 요청 API' })
    @ApiOkResponse({
        description: '트랜잭션 반환 정보 요청.',
    })
    async transactionReceiptByHash(
        @Param('hash') hash: string,
        @Res() res: Response
    ) {
        this.logger.log("transactionReceiptByHash > hash : " + hash);
        const response = await this.transactionService.requestTransactionsReceipt(hash);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Get('receipt/:hash/logs')
    @ApiOperation({ summary: '트랜잭션 반환 로그 정보 요청 API' })
    @ApiOkResponse({
        description: '트랜잭션 반환 로그 정보 요청.',
    })
    async transactionsReceiptLogs(
        @Param('hash') hash: string,
        @Res() res: Response
    ) {
        this.logger.log("transactionsReceiptLogs > hash : " + hash);
        const response = await this.transactionService.requestTransactionsReceiptLogs(hash);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

    @Post('pastLogs')
    @ApiOperation({ summary: '과거 로그 정보 요청 API' })
    @ApiOkResponse({
        description: '과거 로그 정보 요거.',
    })
    async pastLogs(
        @Body() requestDto: OptionsRequestDto,
        @Res() res: Response
    ) {
        const response = await this.transactionService.requestPastLogs(requestDto);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

}
