import { Injectable } from '@nestjs/common';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';

@Injectable()
export class PedidoTrabajadorClienteService {
  create(createPedidoTrabajadorClienteDto: CreatePedidoTrabajadorClienteDto) {
    return 'This action adds a new pedidoTrabajadorCliente';
  }

  findAll() {
    return `This action returns all pedidoTrabajadorCliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidoTrabajadorCliente`;
  }

  update(id: number, updatePedidoTrabajadorClienteDto: UpdatePedidoTrabajadorClienteDto) {
    return `This action updates a #${id} pedidoTrabajadorCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidoTrabajadorCliente`;
  }
}
