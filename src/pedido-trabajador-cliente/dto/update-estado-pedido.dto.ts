// src/pedido-trabajador-cliente/dto/update-estado-pedido.dto.ts
import { IsInt, Min, Max } from 'class-validator';

export class UpdateEstadoPedidoDto {
  @IsInt()
  @Min(1) // Estado mínimo permitido
  @Max(5) // Estado máximo permitido (ajusta según tus necesidades)
  estadoPedido: number;
}