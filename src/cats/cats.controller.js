import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Bind,
  Dependencies,
  ParseIntPipe
} from '@nestjs/common';
import { CatsService } from './cats.service';

import {ForbiddenException} from '../common/filters/http-exception.filter'

@Controller('cats')
@Dependencies(CatsService)
export class CatsController {
  constructor(catsService) {
    this.catsService = catsService;
  }

  @Post()
  @Bind(Body())
  async create(createCatDto) {
    this.catsService.create(createCatDto);
    return 'Add new cat success!';
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async findOne(id) {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Bind(Param('id', ParseIntPipe), Body())
  update(id, updateCatDto) {
    if (!updateCatDto.length) throw new ForbiddenException('Can not find any fields to update');
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Bind(Param('id', ParseIntPipe))
  remove(id) {
    return `This action removes a #${id} cat`;
  }
}
