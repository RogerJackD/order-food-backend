import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FamiliaProducto } from '../../familia-producto/entities/familia-producto.entity';

@Entity('subfamiliaproducto')
export class SubFamiliaProducto {

  @PrimaryGeneratedColumn({ name: 'IdSubFamiliaProducto' })
  idSubFamiliaProducto: number;

  @Column({ name: 'NombreSubFamiliaProducto', type: 'varchar', length: 250 })
  nombreSubFamiliaProducto: string;

  @Column({ name: 'NoEspecificado', type: 'varchar', length: 1 })
  noEspecificado: string;

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

  @Column({ name: 'EstadoSincronizacion', type: 'char', length: 1, default: '0', comment: '0 : Pendiente Sincronizacion, 1 : Sincronizado' })
  estadoSincronizacion: string;

  // RELACIÓN CON FAMILIA PRODUCTO
  @ManyToOne(() => FamiliaProducto)
  @JoinColumn({ name: 'IdFamiliaProducto' })
  familiaProducto: FamiliaProducto;
}
