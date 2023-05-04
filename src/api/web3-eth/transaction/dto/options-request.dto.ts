import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OptionsRequestDto {
  @IsNotEmpty({ message: '주소(address)은 필수 값 입니다.' })
  @IsString({ message: '주소(address)의 형식이 올 바르지 않습니다.' })
  @ApiProperty({ description: '주소' })
  address: string;

  @IsNotEmpty({ message: '토픽(topics)은 필수 값 입니다.' })
  @IsString({ message: '토픽(topics)의 형식이 올 바르지 않습니다.' })
  @ApiProperty({ description: '토픽' })
  topics: string[];
}
