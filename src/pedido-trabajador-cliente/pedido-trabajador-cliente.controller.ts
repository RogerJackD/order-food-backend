import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoTrabajadorClienteService } from './pedido-trabajador-cliente.service';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';

@Controller('delivery')
export class PedidoTrabajadorClienteController {
  constructor(private readonly pedidoTrabajadorClienteService: PedidoTrabajadorClienteService) {}

  @Post()
  create(@Body() createPedidoTrabajadorClienteDto: CreatePedidoTrabajadorClienteDto) {
    return this.pedidoTrabajadorClienteService.create(createPedidoTrabajadorClienteDto);
  }

  @Get()
  findAll() {
    return this.pedidoTrabajadorClienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoTrabajadorClienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoTrabajadorClienteDto: UpdatePedidoTrabajadorClienteDto) {
    return this.pedidoTrabajadorClienteService.update(+id, updatePedidoTrabajadorClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoTrabajadorClienteService.remove(+id);
  }
}
