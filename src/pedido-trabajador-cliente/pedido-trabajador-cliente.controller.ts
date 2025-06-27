import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { PedidoTrabajadorClienteService } from './pedido-trabajador-cliente.service';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { ValidateDniDto } from './dto/validate-dni.dto';

@Controller('delivery')
export class PedidoTrabajadorClienteController {
  constructor(private readonly pedidoTrabajadorClienteService: PedidoTrabajadorClienteService) {}

  @Post()
  create(@Body() createPedidoTrabajadorClienteDto: CreatePedidoTrabajadorClienteDto) {
    return this.pedidoTrabajadorClienteService.create(createPedidoTrabajadorClienteDto);
  }

  @Get()
  findAll() {
    return this.pedidoTrabajadorClienteService.obtenerTodos();
  }

  @Get('validardni')
  findOne(@Query() params: ValidateDniDto) {
    return this.pedidoTrabajadorClienteService.findOne(params.dni);
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
