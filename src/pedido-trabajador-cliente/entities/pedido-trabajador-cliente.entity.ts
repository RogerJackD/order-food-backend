import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { TrabajadorCliente } from '../../trabajador-cliente/entities/trabajador-cliente.entity';
import { Producto } from '../../producto/entities/producto.entity';
import { LugarDestino } from '../../lugar-destino/entities/lugar-destino.entity';

@Entity('PedidoTrabajadorCliente')
export class PedidoTrabajadorCliente {

  @PrimaryGeneratedColumn({ name: 'idPedido' })
  idPedido: number;

  @Column({ name: 'IdTrabajador' })
  idTrabajador: number;

  @Column({ name: 'IdCliente' })
  idCliente: number;
  // Relación compuesta con TrabajadorCliente
  @ManyToOne(() => TrabajadorCliente, { eager: true })
  @JoinColumn([
    { name: 'IdTrabajador', referencedColumnName: 'idTrabajador' },
    { name: 'IdCliente', referencedColumnName: 'idCliente' }
  ])
  trabajadorCliente: TrabajadorCliente;


  @Column({ name: 'FechaPedido', type: 'date' })
  fechaPedido: string;

  // Productos
  @ManyToOne(() => Producto, { nullable: true, eager: true })
  @JoinColumn({ name: 'IdProductoDesayuno' })
  productoDesayuno: Producto;

  @ManyToOne(() => Producto, { nullable: true, eager: true })
  @JoinColumn({ name: 'IdProductoAlmuerzo' })
  productoAlmuerzo: Producto;

  @ManyToOne(() => Producto, { nullable: true, eager: true })
  @JoinColumn({ name: 'IdProductoCena' })
  productoCena: Producto;

  // Lugares de entrega
  @ManyToOne(() => LugarDestino, { nullable: true, eager: true })
  @JoinColumn({ name: 'IdLugarEntregaDesayuno' })
  lugarEntregaDesayuno: LugarDestino;

  @ManyToOne(() => LugarDestino, { nullable: true, eager: true })
  @JoinColumn({ name: 'IdLugarEntregaAlmuerzo' })
  lugarEntregaAlmuerzo: LugarDestino;

  @ManyToOne(() => LugarDestino, { nullable: true, eager: true })
  @JoinColumn({ name: 'IdLugarEntregaCena' })
  lugarEntregaCena: LugarDestino;

  @Column({ name: 'EstadoPedido', type: 'int' })
  estadoPedido: number;

  @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1 })
  indicadorEstado: string;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50, nullable: true })
  usuarioRegistro: string;

  @Column({ name: 'FechaModificacion', type: 'date', nullable: true })
  fechaModificacion: string;
}
