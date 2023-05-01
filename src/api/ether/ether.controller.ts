import {
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';

@Controller('v1/ether')
@ApiTags('ERC20 TOKEN API')
export class EtherController {
}
