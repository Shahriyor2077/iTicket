import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SetTypeService } from './set_type.service';
import { CreateSetTypeDto } from './dto/create-set_type.dto';
import { UpdateSetTypeDto } from './dto/update-set_type.dto';

@Controller('set-type')
export class SetTypeController {
  constructor(private readonly setTypeService: SetTypeService) {}

  @Post()
  create(@Body() createSetTypeDto: CreateSetTypeDto) {
    return this.setTypeService.create(createSetTypeDto);
  }

  @Get()
  findAll() {
    return this.setTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetTypeDto: UpdateSetTypeDto) {
    return this.setTypeService.update(id, updateSetTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setTypeService.remove(id);
  }
}
