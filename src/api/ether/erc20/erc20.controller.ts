import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { instanceToPlain } from "class-transformer";
import { Erc20Service } from "./erc20.service";
import { Erc20TokenTransferRequestDto } from "./dto/erc20-token-transfer-request.dto";

@Controller('v1/ether/erc20')
@ApiTags('ERC20 TOKEN API')
export class Erc20Controller {
  constructor(private readonly service: Erc20Service) {}

  @Get('symbol')
  @ApiOperation({ summary: 'ERC20 TOKEN API' })
  @ApiOkResponse({ description: 'ERC20 TOKEN 심볼 을 조회 한다.' })
  async getName(@Res() res: Response) {
    const responseDto = await this.service.symbol();
    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }

  @Get('balance/:address')
  @ApiOperation({ summary: '잔액 조회 API' })
  @ApiOkResponse({ description: '잔액 를 조회 한다.' })
  async getBalance(@Param('address') address: string, @Res() res: Response) {
    const response = await this.service.getBalance(address);
    return res.status(HttpStatus.OK).json(instanceToPlain(response));
  }

  @Post('transfer')
  @ApiOperation({
    summary: '토큰 전송 API',
    description: '토큰 을 전송 한다.',
  })
  @ApiCreatedResponse({ description: 'ERC20 TOKEN 를 전송 한다.' })
  async transfer(
    @Body() requestDto: Erc20TokenTransferRequestDto,
    @Res() res: Response,
  ) {
    const responseDto = await this.service.transfer(requestDto);
    return res.status(HttpStatus.CREATED).json(instanceToPlain(responseDto));
  }
}
