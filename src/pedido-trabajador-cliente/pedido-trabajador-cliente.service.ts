import { Injectable } from '@nestjs/common';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { ValidateDniDto } from './dto/validate-dni.dto';

@Injectable()
export class PedidoTrabajadorClienteService {
  create(createPedidoTrabajadorClienteDto: CreatePedidoTrabajadorClienteDto) {
    return 'This action adds a new pedidoTrabajadorCliente';
  }

  findAll() {
    return `This action returns all pedidoTrabajadorCliente`;
  }

  findOne(dni: string) {
    return `This action returns a #${dni} pedidoTrabajadorCliente`;
  }

  update(id: number, updatePedidoTrabajadorClienteDto: UpdatePedidoTrabajadorClienteDto) {
    return `This action updates a #${id} pedidoTrabajadorCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidoTrabajadorCliente`;
  }
}
