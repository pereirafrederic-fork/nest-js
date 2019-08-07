import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@Controller()
@ApiUseTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

 @ApiOperation({ title: 'say hello' })
 @ApiResponse({
  status: 201,
  description: 'texte du message hello world',
  type: String,
})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
