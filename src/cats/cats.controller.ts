import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@UseInterceptors(new SanitizeMongooseModelInterceptor({ excludeMongooseId: false, excludeMongooseV: true }))
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.catsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
