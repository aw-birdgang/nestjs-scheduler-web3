import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EthersContract, EthersSigner, InjectContractProvider, InjectSignerProvider } from "nestjs-ethers";
import { ConfigService } from "../../../config";
import { Contract } from "@ethersproject/contracts";
import * as abi from "../abi/ERC20-TOKEN";
import { BigNumberish } from "ethers";
import { isEmpty } from "../../../common/util/is-empty";
import { Erc20TokenTransferRequestDto } from "./dto/erc20-token-transfer-request.dto";
import { convertParseUnits } from "../../../common/util/utils";

@Injectable()
export class Erc20Service {
  constructor(
    @InjectContractProvider()
    private readonly contract: EthersContract,
    @InjectSignerProvider()
    private readonly signer: EthersSigner,
    private readonly configureService: ConfigService,
  ) {}

  private readonly logger = new Logger(Erc20Service.name);

  async symbol() {
    const contract: Contract = this.contract.create(
      abi.CONTRACT,
      abi.ABI,
    );
    const network = await contract?.provider?.getNetwork();
    this.logger.log('symbol > network : ' + network.toString());
    if (!network) {
      throw new Error('No provider injected');
    }
    const tx = await contract.symbol();
    this.logger.log('test > tx : ' + tx.toString);
    return tx;
  }

  async getBalance(address: string) {
    const contract: Contract = this.contract.create(
      abi.CONTRACT,
      abi.ABI,
    );
    const network = await contract?.provider?.getNetwork();
    if (!network) {
      throw new Error('No provider injected');
    }
    const balance: BigNumberish = await contract.balanceOf(address);
    if (isEmpty(balance) === true) {
      throw new NotFoundException("NOT_FOUND_BALANCE");
    }
    this.logger.log('balance > balance : ' + balance.toString());
    return balance.toString();
  }

  async transfer(requestDto: Erc20TokenTransferRequestDto) {
    this.logger.log('transfer > privateKey : ' + requestDto.privateKey);
    this.logger.log('transfer > toAddress : ' + requestDto.toAddress);
    this.logger.log('transfer > amount : ' + requestDto.amount);
    const wallet = this.signer.createWallet(requestDto.privateKey);
    const contract: Contract = this.contract.create(
      abi.CONTRACT,
      abi.ABI,
      wallet,
    );
    const network = await contract?.provider?.getNetwork();
    if (!network) {
      throw new Error('No provider injected');
    }
    const signerNetwork = await contract?.signer.provider?.getNetwork();
    if (!signerNetwork) {
      throw new Error('No signer injected');
    }
    const address = requestDto.toAddress;
    const amount = convertParseUnits(requestDto.amount.toString());
    this.logger.log('transfer > address : ' + address);
    this.logger.log('transfer > requestDto.amount : ' + requestDto.amount);
    this.logger.log('transfer > amount : ' + amount);
    const tx = await contract.transfer(address, amount);
    if (isEmpty(tx) === true) {
      throw new NotFoundException("NOT_FOUND_BALANCE");
    }
    this.logger.log('transfer > tx.hash : ' + tx.hash);
    // const receipt = await tx.wait();
    // this.logger.log('mint > result : ' + receipt.blockNumber.toString());
  }


}
