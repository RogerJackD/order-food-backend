import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('familiaproducto')
export class FamiliaProducto {
  
  @PrimaryGeneratedColumn({ name: 'IdFamiliaProducto' })
  idFamiliaProducto: number;

  @Column({ name: 'NombreFamiliaProducto', type: 'varchar', length: 250 })
  nombreFamiliaProducto: string;

  @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1 })
  indicadorEstado: string;

  @Column({ name: 'CuentaContable', type: 'varchar', length: 20 })
  cuentaContable: string;

  @Column({ name: 'NoEspecificado', type: 'varchar', length: 1 })
  noEspecificado: string;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50 })
  usuarioRegistro: string;

  @Column({ name: 'FechaRegistro', type: 'datetime' })
  fechaRegistro: Date;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
  usuarioModificacion?: string;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion?: Date;

  @Column({ name: 'InicialesFamiliaNombreProducto', type: 'char', length: 20, default: '' })
  inicialesFamiliaNombreProducto: string;

  @Column({ name: 'InicialesFamiliaCodigoNombreProducto', type: 'char', length: 20, default: '' })
  inicialesFamiliaCodigoNombreProducto: string;

  @Column({ name: 'UltimoCodigoMercaderia', type: 'varchar', length: 100, default: '0' })
  ultimoCodigoMercaderia: string;

  @Column({ name: 'EstadoSincronizacion', type: 'char', length: 1, default: '0', comment: '0 : Pendiente Sincronizacion, 1 : Sincronizado' })
  estadoSincronizacion: string;
}