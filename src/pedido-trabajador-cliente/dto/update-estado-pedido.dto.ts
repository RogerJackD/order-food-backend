// src/pedido-trabajador-cliente/dto/update-estado-pedido.dto.ts
import { IsInt, IsArray } from 'class-validator';

export class UpdateEstadoPedidoDto {
  @IsArray()
  @IsInt({ each: true })
  pedidosIds: number[]; // Array de IDs de pedidos a actualizar
}