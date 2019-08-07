import { Controller, Get , Req, Post, HttpCode, Body,  Header, Param , HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { CreateCatDto } from './cats.dto'


import {HttpExceptionFilter} from '../common/http-exception.filter'


@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Req() request: Request):  Promise<Cat[]> {

    return this.catsService.findAll();
  }

  @Get('cat/:id')
  async findOne(@Param() params): Promise<Cat> {
  console.log(params.id);
    return this.catsService.findOne(params.id);
}




  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
   this.catsService.create(createCatDto);
  }


  @Get('/cat')
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
@UseFilters(new HttpExceptionFilter())
  async createForbidden(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

}
