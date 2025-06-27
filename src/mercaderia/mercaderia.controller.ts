import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MercaderiaService } from './mercaderia.service';
import { CreateMercaderiaDto } from './dto/create-mercaderia.dto';
import { UpdateMercaderiaDto } from './dto/update-mercaderia.dto';

@Controller('mercaderia')
export class MercaderiaController {
  constructor(private readonly mercaderiaService: MercaderiaService) {}

  @Post()
  create(@Body() createMercaderiaDto: CreateMercaderiaDto) {
    return this.mercaderiaService.create(createMercaderiaDto);
  }

  @Get()
  findAll() {
    return this.mercaderiaService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mercaderiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMercaderiaDto: UpdateMercaderiaDto) {
    return this.mercaderiaService.update(+id, updateMercaderiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mercaderiaService.remove(+id);
  }
}
