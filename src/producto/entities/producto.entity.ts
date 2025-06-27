import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('producto')
export class Producto {

  @PrimaryGeneratedColumn({ name: 'IdProducto' })
  idProducto: number;

  @Column({ name: 'NombreProducto', type: 'varchar', length: 300, default: '' })
  nombreProducto: string;

  @Column({ name: 'NombreLargoProducto', type: 'varchar', length: 1000, default: '' })
  nombreLargoProducto: string;

  @Column({ name: 'EstadoProducto', type: 'char', length: 1, default: '1', comment: '1 visible json 0 no visible json' })
  estadoProducto: string;

  @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1 })
  indicadorEstado: string;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50 })
  usuarioRegistro: string;

  @Column({ name: 'FechaRegistro', type: 'datetime' })
  fechaRegistro: Date;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
  usuarioModificacion?: string;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion?: Date;

  @Column({ name: 'CostoUnitarioCompra', type: 'decimal', precision: 10, scale: 4, default: 0.0000 })
  costoUnitarioCompra: number;

  @Column({ name: 'PrecioUnitarioCompra', type: 'decimal', precision: 10, scale: 4, default: 0.0000 })
  precioUnitarioCompra: number;

  @Column({ name: 'FechaIngreso', type: 'date', nullable: true })
  fechaIngreso?: Date;

  @Column({ name: 'NumeroOrdenProductoPorFamilia', type: 'int', nullable: true })
  numeroOrdenProductoPorFamilia?: number;

  @Column({ name: 'EstadoSincronizacion', type: 'char', length: 1, default: '0', comment: '0 : Pendiente Sincronizacion, 1 : Sincronizado' })
  estadoSincronizacion: string;
}
