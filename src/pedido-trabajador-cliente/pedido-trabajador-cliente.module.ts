import { Module } from '@nestjs/common';
import { PedidoTrabajadorClienteService } from './pedido-trabajador-cliente.service';
import { PedidoTrabajadorClienteController } from './pedido-trabajador-cliente.controller';

@Module({
  controllers: [PedidoTrabajadorClienteController],
  providers: [PedidoTrabajadorClienteService],
})
export class PedidoTrabajadorClienteModule {}
