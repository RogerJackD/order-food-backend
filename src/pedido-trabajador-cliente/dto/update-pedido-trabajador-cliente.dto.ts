import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoTrabajadorClienteDto } from './create-pedido-trabajador-cliente.dto';

export class UpdatePedidoTrabajadorClienteDto extends PartialType(CreatePedidoTrabajadorClienteDto) {}
