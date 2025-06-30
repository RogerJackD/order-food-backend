import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { TrabajadorCliente } from 'src/trabajador-cliente/entities/trabajador-cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository, UpdateResult } from 'typeorm';
import { PedidoTrabajadorCliente } from './entities/pedido-trabajador-cliente.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { LugarDestino } from 'src/lugar-destino/entities/lugar-destino.entity';

@Injectable()
export class PedidoTrabajadorClienteService {
  constructor(
    @InjectRepository(TrabajadorCliente)
    private readonly trabajadorClienteRepository: Repository<TrabajadorCliente>,

    //llamar entidad y repositorio pedido
    @InjectRepository(PedidoTrabajadorCliente)
    private readonly pedidoTrabajadorClienteRepository: Repository<PedidoTrabajadorCliente>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(LugarDestino)
    private readonly lugarDestinoRepository: Repository<LugarDestino>,
  ) {}

  //crear pedidos

  async crearPedidosPorRangoFechas(
    createDto: CreatePedidoTrabajadorClienteDto,
  ): Promise<PedidoTrabajadorCliente[]> {
    const fechaInicio = new Date(createDto.FechaIngreso);
    const fechaFin = new Date(createDto.FechaSalida);

    // Buscar pedidos existentes incluyendo las relaciones con productos
    const pedidosExistentes = await this.pedidoTrabajadorClienteRepository.find(
      {
        where: {
          idTrabajador: createDto.IdTrabajador,
          idCliente: createDto.IdCliente,
          fechaPedido: Between(
            fechaInicio.toISOString().split('T')[0],
            fechaFin.toISOString().split('T')[0],
          ),
        },
        relations: ['productoDesayuno', 'productoAlmuerzo', 'productoCena'],
      },
    );

    if (pedidosExistentes.length > 0) {
      // Procesar los pedidos existentes para obtener información detallada
      const conflictos = pedidosExistentes.map((pedido) => {
        return {
          fecha: pedido.fechaPedido,
          productos: {
            desayuno: pedido.productoDesayuno
              ? {
                  id: pedido.productoDesayuno.idProducto,
                  nombre: pedido.productoDesayuno.nombreProducto,
                }
              : null,
            almuerzo: pedido.productoAlmuerzo
              ? {
                  id: pedido.productoAlmuerzo.idProducto,
                  nombre: pedido.productoAlmuerzo.nombreProducto,
                }
              : null,
            cena: pedido.productoCena
              ? {
                  id: pedido.productoCena.idProducto,
                  nombre: pedido.productoCena.nombreProducto,
                }
              : null,
          },
        };
      });

      throw new BadRequestException({
        message:
          'Ya existen pedidos para algunas fechas en el rango solicitado',
        trabajadorId: createDto.IdTrabajador,
        clienteId: createDto.IdCliente,
        conflictos,
        rangoSolicitado: {
          desde: createDto.FechaIngreso,
          hasta: createDto.FechaSalida,
        },
      });
    }

    // Resto del código para crear nuevos pedidos...
    const diffTime = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const pedidosACrear: PedidoTrabajadorCliente[] = [];

    for (let i = 0; i < diffDays; i++) {
      const fechaActual = new Date(fechaInicio);
      fechaActual.setDate(fechaInicio.getDate() + i);

      const pedido = new PedidoTrabajadorCliente();
      pedido.idTrabajador = createDto.IdTrabajador;
      pedido.idCliente = createDto.IdCliente;
      pedido.trabajadorCliente = {
        idTrabajador: createDto.IdTrabajador,
        idCliente: createDto.IdCliente,
      } as TrabajadorCliente;
      pedido.fechaPedido = fechaActual.toISOString().split('T')[0];

      if (createDto.IdProductoDesayuno) {
        pedido.productoDesayuno = {
          idProducto: createDto.IdProductoDesayuno,
        } as Producto;
      }
      if (createDto.IdProductoAlmuerzo) {
        pedido.productoAlmuerzo = {
          idProducto: createDto.IdProductoAlmuerzo,
        } as Producto;
      }
      if (createDto.IdProductoCena) {
        pedido.productoCena = {
          idProducto: createDto.IdProductoCena,
        } as Producto;
      }

      pedido.estadoPedido = 1;
      pedido.indicadorEstado = 'A';
      pedido.usuarioRegistro = 'usuario-actual';

      pedidosACrear.push(pedido);
    }

    return this.pedidoTrabajadorClienteRepository.save(pedidosACrear);
  }

  async obtenerTodos(): Promise<PedidoTrabajadorCliente[]> {
    return this.pedidoTrabajadorClienteRepository.find();
  }

  async findOne(dni: string) {
    const trabajador = await this.trabajadorClienteRepository
      .createQueryBuilder('tc')
      .innerJoin('tc.trabajador', 'p') // relación ManyToOne con Persona
      .select([
        'tc.idTrabajador AS "idTrabajador"',
        'tc.idCliente AS "idCliente"',
        'p.razonSocial AS "nombres"',
      ])
      .where('p.numeroDocumentoIdentidad = :dni', { dni })
      .andWhere('p.idTipoDocumentoIdentidad = :tipoDoc', { tipoDoc: 2 })
      .andWhere('p.indicadorEstado = :estado', { estado: 'A' })
      .andWhere('tc.indicadorEstado = :estado', { estado: 'A' })
      .getRawOne();

    console.log(trabajador); // Para ver qué devuelve exactamente

    if (!trabajador) throw new BadRequestException('trabajador no encontrado');

    return {
      nombres: trabajador.nombres,
      idTrabajador: trabajador.idTrabajador,
      idCliente: trabajador.idCliente,
    };
  }

  // async createOrder(data: CreatePedidoTrabajadorClienteDto): Promise<any> {
  //   const nuevoPedido = {
  //     ...data,
  //     EstadoPedido: 1, // Estado inicial
  //   };

  //   console.log(nuevoPedido);
  //   return nuevoPedido;
  // }

  async actualizarPedidosPorRangoFechas(
    idTrabajador: number,
    updateDto: UpdatePedidoTrabajadorClienteDto,
  ): Promise<{
    actualizados: PedidoTrabajadorCliente[];
    creados: PedidoTrabajadorCliente[];
  }> {
    // 1. Obtener el idCliente asociado al trabajador
    const relacion = await this.trabajadorClienteRepository.findOne({
      where: { idTrabajador },
      order: { fechaRegistro: 'DESC' }
    });

    if (!relacion) {
      throw new BadRequestException(`No se encontró cliente asociado al trabajador ${idTrabajador}`);
    }

    const idCliente = relacion.idCliente;
    const fechaInicio = new Date(updateDto.FechaIngreso);
    const fechaFin = new Date(updateDto.FechaSalida);

    // 2. Calcular todas las fechas en el rango
    const todasFechasEnRango: string[] = [];
    const currentDate = new Date(fechaInicio);
    
    while (currentDate <= fechaFin) {
      todasFechasEnRango.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 3. Buscar pedidos existentes
    const pedidosExistentes = await this.pedidoTrabajadorClienteRepository.find({
      where: {
        idTrabajador,
        idCliente,
        fechaPedido: In(todasFechasEnRango),
      },
    });

    // 4. Separar fechas existentes y no existentes
    const fechasExistentes = pedidosExistentes.map(p => p.fechaPedido);
    const fechasNoExistentes = todasFechasEnRango.filter(
      fecha => !fechasExistentes.includes(fecha)
    );

    // 5. Actualizar pedidos existentes
    const pedidosActualizados = await Promise.all(
      pedidosExistentes.map(async (pedido) => {
        return this.aplicarActualizacionesAPedido(pedido, updateDto);
      })
    );

    // 6. Crear nuevos pedidos para fechas faltantes
    const nuevosPedidos = await Promise.all(
      fechasNoExistentes.map(async (fecha) => {
        const nuevoPedido = new PedidoTrabajadorCliente();
        nuevoPedido.idTrabajador = idTrabajador;
        nuevoPedido.idCliente = idCliente;
        nuevoPedido.fechaPedido = fecha;
        nuevoPedido.trabajadorCliente = { 
          idTrabajador, 
          idCliente 
        } as TrabajadorCliente;
        
        // Valores por defecto
        nuevoPedido.estadoPedido = 1;
        nuevoPedido.indicadorEstado = 'A';
        nuevoPedido.usuarioRegistro = 'usuario-actual';
        
        return this.aplicarActualizacionesAPedido(nuevoPedido, updateDto);
      })
    );

    // 7. Guardar todos los cambios
    const [savedActualizados, savedCreados] = await Promise.all([
      this.pedidoTrabajadorClienteRepository.save(pedidosActualizados),
      this.pedidoTrabajadorClienteRepository.save(nuevosPedidos),
    ]);

    return {
      actualizados: savedActualizados,
      creados: savedCreados,
    };
  }

  private async aplicarActualizacionesAPedido(
    pedido: PedidoTrabajadorCliente,
    updateDto: UpdatePedidoTrabajadorClienteDto,
  ): Promise<PedidoTrabajadorCliente> {
    // Actualizar productos
    if (updateDto.IdProductoDesayuno !== undefined) {
      pedido.productoDesayuno = updateDto.IdProductoDesayuno !== null 
        ? await this.productoRepository.findOneBy({ idProducto: updateDto.IdProductoDesayuno })
        : null;
    }
    
    if (updateDto.IdProductoAlmuerzo !== undefined) {
      pedido.productoAlmuerzo = updateDto.IdProductoAlmuerzo !== null
        ? await this.productoRepository.findOneBy({ idProducto: updateDto.IdProductoAlmuerzo })
        : null;
    }
    
    if (updateDto.IdProductoCena !== undefined) {
      pedido.productoCena = updateDto.IdProductoCena !== null
        ? await this.productoRepository.findOneBy({ idProducto: updateDto.IdProductoCena })
        : null;
    }

    // Actualizar lugares de entrega
    if (updateDto.IdLugarEntregaDesayuno !== undefined) {
      pedido.lugarEntregaDesayuno = updateDto.IdLugarEntregaDesayuno !== null
        ? await this.lugarDestinoRepository.findOneBy({ idLugarDestino: updateDto.IdLugarEntregaDesayuno })
        : null;
    }
    
    if (updateDto.IdLugarEntregaAlmuerzo !== undefined) {
      pedido.lugarEntregaAlmuerzo = updateDto.IdLugarEntregaAlmuerzo !== null
        ? await this.lugarDestinoRepository.findOneBy({ idLugarDestino: updateDto.IdLugarEntregaAlmuerzo })
        : null;
    }
    
    if (updateDto.IdLugarEntregaCena !== undefined) {
      pedido.lugarEntregaCena = updateDto.IdLugarEntregaCena !== null
        ? await this.lugarDestinoRepository.findOneBy({ idLugarDestino: updateDto.IdLugarEntregaCena })
        : null;
    }

    // Actualizar metadatos
    pedido.fechaModificacion = new Date().toISOString().split('T')[0];

    return pedido;
  }



async actualizarEstadoPedido(pedidosIds: number[]): Promise<UpdateResult> {
  // Validar que existan los pedidos
  const pedidosExistentes = await this.pedidoTrabajadorClienteRepository.count({
    where: { idPedido: In(pedidosIds) }
  });

  if (pedidosExistentes !== pedidosIds.length) {
    throw new BadRequestException('Algunos pedidos no existen');
  }

  // Actualizar en lote
  return this.pedidoTrabajadorClienteRepository.update(
    { idPedido: In(pedidosIds) },
    { 
      estadoPedido: 2,
      fechaModificacion: () => 'CURRENT_TIMESTAMP', // Usar función de BD
    }
  );
}



  ///////////////////

  findAll() {
    return `This action returns all pedidoTrabajadorCliente`;
  }

  update(
    id: number,
    updatePedidoTrabajadorClienteDto: UpdatePedidoTrabajadorClienteDto,
  ) {
    return `This action updates a #${id} pedidoTrabajadorCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidoTrabajadorCliente`;
  }
}
