import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Erc20TokenTransferRequestDto {
  @IsNotEmpty({ message: '개인 키(privateKey)은 필수 값 입니다.' })
  @IsString({
    message: '개인 키(privateKey)의 형식이 올 바르지 않습 니다.',
  })
  @ApiProperty({ description: '서명을 위한 개인 키' })
  privateKey: string;

  @IsNotEmpty({ message: '받는 주소(toAddress)은 필수 값 입니다.' })
  @IsString({ message: '받는 주소(toAddress)의 형식이 올 바르지 않습 니다.' })
  @ApiProperty({ description: '받는 주소' })
  toAddress: string;

  @IsNotEmpty({ message: '수량(amount)은 필수 값 입니다.' })
  @ApiProperty({ description: '수량' })
  amount: number;
}
