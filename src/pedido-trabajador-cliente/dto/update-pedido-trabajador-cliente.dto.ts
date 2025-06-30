import { IsOptional, IsInt, IsDateString } from 'class-validator';
import { IsAfterOrYesterday } from '../../common/validators/is-after-today.validator';

export class UpdatePedidoTrabajadorClienteDto {
  @IsDateString()
  @IsAfterOrYesterday({ message: 'La FechaIngreso no puede ser menor a hoy' })
  FechaIngreso: string;

  @IsDateString()
  @IsAfterOrYesterday({ message: 'La FechaSalida no puede ser menor a hoy' })
  FechaSalida: string;

  @IsOptional()
  @IsInt()
  IdProductoDesayuno?: number | null;

  @IsOptional()
  @IsInt()
  IdProductoAlmuerzo?: number | null;

  @IsOptional()
  @IsInt()
  IdProductoCena?: number | null;

  @IsOptional()
  @IsInt()
  IdLugarEntregaDesayuno?: number | null;

  @IsOptional()
  @IsInt()
  IdLugarEntregaAlmuerzo?: number | null;

  @IsOptional()
  @IsInt()
  IdLugarEntregaCena?: number | null;
}