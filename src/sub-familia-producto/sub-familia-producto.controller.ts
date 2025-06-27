import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubFamiliaProductoService } from './sub-familia-producto.service';
import { CreateSubFamiliaProductoDto } from './dto/create-sub-familia-producto.dto';
import { UpdateSubFamiliaProductoDto } from './dto/update-sub-familia-producto.dto';

@Controller('sub-familia-producto')
export class SubFamiliaProductoController {
  constructor(private readonly subFamiliaProductoService: SubFamiliaProductoService) {}

  @Post()
  create(@Body() createSubFamiliaProductoDto: CreateSubFamiliaProductoDto) {
    return this.subFamiliaProductoService.create(createSubFamiliaProductoDto);
  }

  @Get()
  findAll() {
    return this.subFamiliaProductoService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subFamiliaProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubFamiliaProductoDto: UpdateSubFamiliaProductoDto) {
    return this.subFamiliaProductoService.update(+id, updateSubFamiliaProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subFamiliaProductoService.remove(+id);
  }
}
