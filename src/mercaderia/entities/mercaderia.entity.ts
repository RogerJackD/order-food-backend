import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';
import { SubFamiliaProducto } from '../../sub-familia-producto/entities/sub-familia-producto.entity';

@Entity('mercaderia')
export class Mercaderia {

  @PrimaryGeneratedColumn({ name: 'IdProducto' })
  idProducto: number;

  @Column({ name: 'CodigoMercaderia', type: 'varchar', length: 30, default: '' })
  codigoMercaderia: string;

  @Column({ name: 'CodigoMercaderia2', type: 'varchar', length: 60, default: '' })
  codigoMercaderia2: string;

  @Column({ name: 'CodigoAlterno', type: 'varchar', length: 350, default: '' })
  codigoAlterno: string;

  @Column({ name: 'IdProveedor', type: 'int', default: 0 })
  idProveedor: number;

  @Column({ name: 'IdTipoExistencia', type: 'int' })
  idTipoExistencia: number;

  @Column({ name: 'IdModelo', type: 'int' })
  idModelo: number;

  @Column({ name: 'IdLineaProducto', type: 'int' })
  idLineaProducto: number;

  @Column({ name: 'IdUnidadMedida', type: 'int' })
  idUnidadMedida: number;

  @Column({ name: 'IdTipoSistemaISC', type: 'int', nullable: true })
  idTipoSistemaISC?: number;

  @Column({ name: 'IdTipoAfectacionIGV', type: 'int', default: 1 })
  idTipoAfectacionIGV: number;

  @Column({ name: 'IdTipoPrecio', type: 'int', nullable: true })
  idTipoPrecio?: number;

  @Column({ name: 'IdFabricante', type: 'int', nullable: true })
  idFabricante?: number;

  @Column({ name: 'IdMoneda', type: 'int', nullable: true })
  idMoneda?: number;

  @Column({ name: 'IdTipoTributo', type: 'int', default: 1 })
  idTipoTributo: number;

  @Column({ name: 'IdOrigenMercaderia', type: 'int', default: 1 })
  idOrigenMercaderia: number;

  @Column({ name: 'AfectoICBPER', type: 'char', length: 1, default: '0', comment: 'artículo 12 de la Ley N.° 30884 - ICBPER' })
  afectoICBPER: string;

  @Column({ name: 'Referencia', type: 'varchar', length: 2500, default: '' })
  referencia: string;

  @Column({ name: 'SaldoFisico', type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  saldoFisico: number;

  @Column({ name: 'StockMinimo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  stockMinimo?: number;

  @Column({ name: 'StockMaximo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  stockMaximo?: number;

  @Column({ name: 'PesoUnitario', type: 'decimal', precision: 10, scale: 2, nullable: true })
  pesoUnitario?: number;

  @Column({ name: 'PrecioUnitario', type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioUnitario?: number;

  @Column({ name: 'CostoPromedioPonderado', type: 'decimal', precision: 15, scale: 4, nullable: true })
  costoPromedioPonderado?: number;

  @Column({ name: 'MargenPorcentaje', type: 'decimal', precision: 15, scale: 4, nullable: true })
  margenPorcentaje?: number;

  @Column({ name: 'MargenUtilidad', type: 'decimal', precision: 15, scale: 4, nullable: true })
  margenUtilidad?: number;

  @Column({ name: 'ValorVenta', type: 'decimal', precision: 15, scale: 4, nullable: true })
  valorVenta?: number;

  @Column({ name: 'ValorIGV', type: 'decimal', precision: 15, scale: 4, nullable: true })
  valorIGV?: number;

  @Column({ name: 'PrecioPromedioCompra', type: 'decimal', precision: 15, scale: 4, nullable: true })
  precioPromedioCompra?: number;

  @Column({ name: 'UltimoPrecio', type: 'decimal', precision: 15, scale: 6, nullable: true })
  ultimoPrecio?: number;

  @Column({ name: 'FechaUltimoPrecio', type: 'datetime', nullable: true })
  fechaUltimoPrecio?: Date;

  @Column({ name: 'FechaVencimiento', type: 'datetime', nullable: true })
  fechaVencimiento?: Date;

  @Column({ name: 'Foto', type: 'varchar', length: 250, nullable: true })
  foto?: string;

  @Column({ name: 'NumeroSerie', type: 'varchar', length: 50, nullable: true })
  numeroSerie?: string;

  @Column({ name: 'NumeroMotor', type: 'varchar', length: 50, nullable: true })
  numeroMotor?: string;

  @Column({ name: 'NumeroPlaca', type: 'varchar', length: 20, nullable: true })
  numeroPlaca?: string;

  @Column({ name: 'Ano', type: 'year', nullable: true })
  ano?: number;

  @Column({ name: 'Color', type: 'varchar', length: 50, nullable: true })
  color?: string;

  @Column({ name: 'Textura', type: 'varchar', length: 50, nullable: true })
  textura?: string;

  @Column({ name: 'Talla', type: 'varchar', length: 50, nullable: true })
  talla?: string;

  @Column({ name: 'Beneficio', type: 'varchar', length: 250, nullable: true })
  beneficio?: string;

  @Column({ name: 'Tamano', type: 'varchar', length: 50, nullable: true })
  tamano?: string;

  @Column({ name: 'OtroDato', type: 'varchar', length: 250, nullable: true })
  otroDato?: string;

  @Column({ name: 'CodigoBarras', type: 'varchar', length: 250, nullable: true })
  codigoBarras?: string;

  @Column({ name: 'AfectoIGV', type: 'varchar', length: 1, default: 'N' })
  afectoIGV: string;

  @Column({ name: 'AfectoISC', type: 'varchar', length: 1, default: 'N' })
  afectoISC: string;

  @Column({ name: 'ISC', type: 'decimal', precision: 10, scale: 2 })
  isc: number;

  @Column({ name: 'SujetoPercepcionVenta', type: 'varchar', length: 1, default: 'N' })
  sujetoPercepcionVenta: string;

  @Column({ name: 'TasaNormal', type: 'decimal', precision: 10, scale: 2 })
  tasaNormal: number;

  @Column({ name: 'TasaAgentePercepcion', type: 'decimal', precision: 10, scale: 2 })
  tasaAgentePercepcion: number;

  @Column({ name: 'TipoDescuento', type: 'char', length: 1, nullable: true })
  tipoDescuento?: string;

  @Column({ name: 'ValorDescuento', type: 'int', nullable: true })
  valorDescuento?: number;

  @Column({ name: 'AfectoBonificacion', type: 'char', length: 1, default: '0' })
  afectoBonificacion: string;

  @Column({ name: 'NumeroPiezas', type: 'int', default: 0 })
  numeroPiezas: number;

  @Column({ name: 'IdMonedaCompra', type: 'int', default: 1 })
  idMonedaCompra: number;

  @Column({ name: 'CostoUnitarioCompra', type: 'decimal', precision: 15, scale: 6, default: 0.000000 })
  costoUnitarioCompra: number;

  @Column({ name: 'PrecioUnitarioCompra', type: 'decimal', precision: 15, scale: 6, default: 0.000000 })
  precioUnitarioCompra: number;

  @Column({ name: 'ReferenciaProveedor', type: 'varchar', length: 450, default: '' })
  referenciaProveedor: string;

  @Column({ name: 'FechaIngresoCompra', type: 'date', nullable: true })
  fechaIngresoCompra?: Date;

  @Column({ name: 'Aplicacion', type: 'varchar', length: 500, default: '' })
  aplicacion: string;

  @Column({ name: 'TipoCambioCompra', type: 'decimal', precision: 10, scale: 3, default: 1.000 })
  tipoCambioCompra: number;

  @Column({ name: 'FechaIngreso', type: 'datetime', nullable: true })
  fechaIngreso?: Date;

  @Column({ name: 'CodigoCorrelativoAutomatico', type: 'varchar', length: 300, default: '' })
  codigoCorrelativoAutomatico: string;

  @Column({ name: 'IndicadorCodigoPropio', type: 'varchar', length: 1, nullable: true })
  indicadorCodigoPropio?: string;

  @Column({ name: 'EstadoCampoCalculo', type: 'char', length: 1, default: '0' })
  estadoCampoCalculo: string;

  @Column({ name: 'Esfera', type: 'varchar', length: 10, nullable: true })
  esfera?: string;

  @Column({ name: 'Cilindro', type: 'varchar', length: 10, nullable: true })
  cilindro?: string;

  @Column({ name: 'Adicion', type: 'varchar', length: 10, nullable: true })
  adicion?: string;

  @Column({ name: 'Diametro', type: 'varchar', length: 10, nullable: true })
  diametro?: string;

  @Column({ name: 'FechaRegistro', type: 'datetime', nullable: true })
  fechaRegistro?: Date;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion?: Date;

  @Column({ name: 'EstadoSincronizacion', type: 'char', length: 1, default: '1' })
  estadoSincronizacion: string;

  @Column({ name: 'IdMonedaUltimoPrecio', type: 'int', nullable: true })
  idMonedaUltimoPrecio?: number;

  @Column({ name: 'genero', type: 'varchar', length: 1, default: '0' })
  genero: string;

  @Column({ name: 'RegistroSanitario', type: 'varchar', length: 400, default: '' })
  registroSanitario: string;

  @Column({ name: 'PaisProcedencia', type: 'varchar', length: 50 })
  paisProcedencia: string;

  @Column({ name: 'IdUnidadMedidaReferencia', type: 'int', nullable: true })
  idUnidadMedidaReferencia?: number;

  @Column({ name: 'FactorUnidadMedidaReferencia', type: 'decimal', precision: 10, scale: 6, nullable: true })
  factorUnidadMedidaReferencia?: number;

  // RELACIÓN CON SUBFAMILIA PRODUCTO
  @ManyToOne(() => SubFamiliaProducto)
  @JoinColumn({ name: 'IdSubFamiliaProducto' })
  subFamiliaProducto: SubFamiliaProducto;

  // RELACIÓN CON PRODUCTO
  @OneToOne(() => Producto)
  @JoinColumn({ name: 'IdProducto' })
  producto: Producto;
}
