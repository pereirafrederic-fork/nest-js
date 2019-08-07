import { Controller, Get , Req, Post, HttpCode, Body,  Header, Param } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { CreateCatDto } from './cats.dto'


@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Req() request: Request):  Promise<Cat[]> {

    return this.catsService.findAll();
  }

  @Get(':id')
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
}
