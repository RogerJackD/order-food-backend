import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { PedidoTrabajadorClienteService } from './pedido-trabajador-cliente.service';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { ValidateDniDto } from './dto/validate-dni.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado-pedido.dto';

@Controller('delivery')
export class PedidoTrabajadorClienteController {
  constructor(private readonly pedidoTrabajadorClienteService: PedidoTrabajadorClienteService) {}

  @Post()
  create(@Body() createPedidoTrabajadorClienteDto: CreatePedidoTrabajadorClienteDto) {
    return this.pedidoTrabajadorClienteService.crearPedidosPorRangoFechas(createPedidoTrabajadorClienteDto);
  }

  @Get()
  findAll() {
    return this.pedidoTrabajadorClienteService.obtenerTodos();
  }

  @Get('validardni')
  findOne(@Query() params: ValidateDniDto) {
    return this.pedidoTrabajadorClienteService.findOne(params.dni);
  }

  @Patch('cliente-pedidos/:idTrabajador')
  async update(
    @Param('idTrabajador') idTrabajador: number,
    @Body() updateDto: UpdatePedidoTrabajadorClienteDto,
  ) {
    console.log(idTrabajador)
    return this.pedidoTrabajadorClienteService.actualizarPedidosPorRangoFechas(
      idTrabajador,
      updateDto,
    );
  }

  @Patch('actualizar-estado')
async actualizarEstado(
  @Body() updateDto: UpdateEstadoPedidoDto,
) {
  return this.pedidoTrabajadorClienteService.actualizarEstadoPedido(updateDto.pedidosIds);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoTrabajadorClienteService.remove(+id);
  }
}
