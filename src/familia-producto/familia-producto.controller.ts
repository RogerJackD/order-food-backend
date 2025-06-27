import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamiliaProductoService } from './familia-producto.service';
import { CreateFamiliaProductoDto } from './dto/create-familia-producto.dto';
import { UpdateFamiliaProductoDto } from './dto/update-familia-producto.dto';

@Controller('familia-producto')
export class FamiliaProductoController {
  constructor(private readonly familiaProductoService: FamiliaProductoService) {}

  @Post()
  create(@Body() createFamiliaProductoDto: CreateFamiliaProductoDto) {
    return this.familiaProductoService.create(createFamiliaProductoDto);
  }

  @Get()
  obtenerTodos() {
      return this.familiaProductoService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiaProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamiliaProductoDto: UpdateFamiliaProductoDto) {
    return this.familiaProductoService.update(+id, updateFamiliaProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiaProductoService.remove(+id);
  }
}
