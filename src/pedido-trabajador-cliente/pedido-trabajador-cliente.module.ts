import { Module } from '@nestjs/common';
import { PedidoTrabajadorClienteService } from './pedido-trabajador-cliente.service';
import { PedidoTrabajadorClienteController } from './pedido-trabajador-cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorCliente } from 'src/trabajador-cliente/entities/trabajador-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrabajadorCliente])],
  controllers: [PedidoTrabajadorClienteController],
  providers: [PedidoTrabajadorClienteService],

})
export class PedidoTrabajadorClienteModule {}
