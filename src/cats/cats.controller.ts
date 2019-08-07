import { Controller, Get , Req, Post, HttpCode, Body,  Header, Param , HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { CreateCatDto } from './cats.dto'

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {CatClass} from './cat.class'


import {HttpExceptionFilter} from '../common/http-exception.filter'

@ApiUseTags('cats')
@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

@ApiOperation({ title: 'get all cats' })
@ApiResponse({
  status: 201,
  description: 'tous les cats ont été trouvé.',
  type: CatClass
})
  @Get()
  async findAll(@Req() request: Request):  Promise<Cat[]> {

    return this.catsService.findAll();
  }

  @Get('cat/:id')
  @ApiResponse({
  status: 200,
  description: 'The found record',
  type: CatClass,
})
  async findOne(@Param() params): Promise<Cat> {
  console.log(params.id);
    return this.catsService.findOne(params.id);
}



@ApiOperation({ title: 'Create cat' })
@ApiResponse({
  status: 201,
  description: 'The record has been successfully created.',
  type: CatClass
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
   this.catsService.create(createCatDto);
  }


  @Get('/cat')
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAllForbiden() {

      /*
      BadRequestException
      UnauthorizedException
      NotFoundException
      ForbiddenException
      NotAcceptableException
      RequestTimeoutException
      ConflictException
      GoneException
      PayloadTooLargeException
      UnsupportedMediaTypeException
      UnprocessableEntityException
      InternalServerErrorException
      NotImplementedException
      BadGatewayException
      ServiceUnavailableException
      GatewayTimeoutException

      */

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: `vous n'avez pas le droit d'accéder à cette ressource`,
      }, 403);
}

  @Post('/cat')
    @ApiResponse({ status: 403, description: 'Forbidden.' })
@UseFilters(new HttpExceptionFilter())
  async createForbidden(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

}
