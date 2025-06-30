import { Module } from '@nestjs/common';
import { PedidoTrabajadorClienteService } from './pedido-trabajador-cliente.service';
import { PedidoTrabajadorClienteController } from './pedido-trabajador-cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorCliente } from 'src/trabajador-cliente/entities/trabajador-cliente.entity';
import { PedidoTrabajadorCliente } from './entities/pedido-trabajador-cliente.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { LugarDestino } from 'src/lugar-destino/entities/lugar-destino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrabajadorCliente, PedidoTrabajadorCliente, Producto, LugarDestino])],
  controllers: [PedidoTrabajadorClienteController],
  providers: [PedidoTrabajadorClienteService],
 
})
export class PedidoTrabajadorClienteModule {}
