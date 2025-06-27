import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LugarDestinoService } from './lugar-destino.service';
import { CreateLugarDestinoDto } from './dto/create-lugar-destino.dto';
import { UpdateLugarDestinoDto } from './dto/update-lugar-destino.dto';

@Controller('lugar-destino')
export class LugarDestinoController {
  constructor(private readonly lugarDestinoService: LugarDestinoService) {}

  @Post()
  create(@Body() createLugarDestinoDto: CreateLugarDestinoDto) {
    return this.lugarDestinoService.create(createLugarDestinoDto);
  }

  @Get()
  findAll() {
    return this.lugarDestinoService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lugarDestinoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLugarDestinoDto: UpdateLugarDestinoDto) {
    return this.lugarDestinoService.update(+id, updateLugarDestinoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lugarDestinoService.remove(+id);
  }
}
