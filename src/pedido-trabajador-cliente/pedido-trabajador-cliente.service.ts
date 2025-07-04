import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { TrabajadorCliente } from 'src/trabajador-cliente/entities/trabajador-cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, EntityNotFoundError, In, Repository, UpdateResult } from 'typeorm';
import { PedidoTrabajadorCliente } from './entities/pedido-trabajador-cliente.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { LugarDestino } from 'src/lugar-destino/entities/lugar-destino.entity';
import { UpdateEstadoPedidoDto } from './dto/update-estado-pedido.dto';

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

  // Verificar conflictos existentes
  const pedidosExistentes = await this.pedidoTrabajadorClienteRepository.find({
    where: {
      idTrabajador: createDto.IdTrabajador,
      idCliente: createDto.IdCliente,
      fechaPedido: Between(
        fechaInicio.toISOString().split('T')[0],
        fechaFin.toISOString().split('T')[0],
      ),
    },
    relations: ['productoDesayuno', 'productoAlmuerzo', 'productoCena'],
  });

  if (pedidosExistentes.length > 0) {
    const conflictos = pedidosExistentes.map((pedido) => ({
      fecha: pedido.fechaPedido,
      productos: {
        desayuno: pedido.productoDesayuno
          ? { id: pedido.productoDesayuno.idProducto, nombre: pedido.productoDesayuno.nombreProducto }
          : null,
        almuerzo: pedido.productoAlmuerzo
          ? { id: pedido.productoAlmuerzo.idProducto, nombre: pedido.productoAlmuerzo.nombreProducto }
          : null,
        cena: pedido.productoCena
          ? { id: pedido.productoCena.idProducto, nombre: pedido.productoCena.nombreProducto }
          : null,
      },
    }));

    throw new ConflictException({
      message: 'Ya existen pedidos para algunas fechas en el rango solicitado',
      trabajadorId: createDto.IdTrabajador,
      clienteId: createDto.IdCliente,
      conflictos,
      rangoSolicitado: {
        desde: createDto.FechaIngreso,
        hasta: createDto.FechaSalida,
      },
    });
  }

  // Buscar productos y lugares si fueron enviados
  const productoDesayuno = createDto.IdProductoDesayuno
    ? await this.productoRepository.findOne({
        where: { idProducto: createDto.IdProductoDesayuno },
      })
    : null;

  const productoAlmuerzo = createDto.IdProductoAlmuerzo
    ? await this.productoRepository.findOne({
        where: { idProducto: createDto.IdProductoAlmuerzo },
      })
    : null;

  const productoCena = createDto.IdProductoCena
    ? await this.productoRepository.findOne({
        where: { idProducto: createDto.IdProductoCena },
      })
    : null;

  const lugarDesayuno = createDto.IdLugarEntregaDesayuno
    ? await this.lugarDestinoRepository.findOne({
        where: { idLugarDestino: createDto.IdLugarEntregaDesayuno },
      })
    : null;

  const lugarAlmuerzo = createDto.IdLugarEntregaAlmuerzo
    ? await this.lugarDestinoRepository.findOne({
        where: { idLugarDestino: createDto.IdLugarEntregaAlmuerzo },
      })
    : null;

  const lugarCena = createDto.IdLugarEntregaCena
    ? await this.lugarDestinoRepository.findOne({
        where: { idLugarDestino: createDto.IdLugarEntregaCena },
      })
    : null;

  // Calcular cantidad de días en el rango
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

    if (productoDesayuno) pedido.productoDesayuno = productoDesayuno;
    if (productoAlmuerzo) pedido.productoAlmuerzo = productoAlmuerzo;
    if (productoCena) pedido.productoCena = productoCena;

    if (lugarDesayuno) pedido.lugarEntregaDesayuno = lugarDesayuno;
    if (lugarAlmuerzo) pedido.lugarEntregaAlmuerzo = lugarAlmuerzo;
    if (lugarCena) pedido.lugarEntregaCena = lugarCena;

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
): Promise<{ actualizados: PedidoTrabajadorCliente[]; creados: PedidoTrabajadorCliente[] }> {
  
  // 1. Validar relación trabajador-cliente
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

  // 2. Generar todas las fechas del rango
  const todasFechasEnRango: string[] = [];
  const currentDate = new Date(fechaInicio);

  while (currentDate <= fechaFin) {
    todasFechasEnRango.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 3. Buscar pedidos activos existentes (excluye anulados)
  const pedidosExistentes = await this.pedidoTrabajadorClienteRepository.find({
    where: {
      idTrabajador,
      idCliente,
      fechaPedido: In(todasFechasEnRango),
      estadoPedido: 1, // Solo pedidos activos
    },
  });

  const fechasExistentes = pedidosExistentes.map(p => p.fechaPedido);
  const fechasNoExistentes = todasFechasEnRango.filter(f => !fechasExistentes.includes(f));

  // 4. Actualizar pedidos existentes
  const pedidosActualizados = await Promise.all(
    pedidosExistentes.map(p => this.aplicarActualizacionesAPedido(p, updateDto))
  );

  // 5. Crear nuevos pedidos para fechas faltantes
  const nuevosPedidos = await Promise.all(
    fechasNoExistentes.map(async (fecha) => {
      const nuevoPedido = new PedidoTrabajadorCliente();
      nuevoPedido.idTrabajador = idTrabajador;
      nuevoPedido.idCliente = idCliente;
      nuevoPedido.fechaPedido = fecha;
      nuevoPedido.trabajadorCliente = { idTrabajador, idCliente } as TrabajadorCliente;
      nuevoPedido.estadoPedido = 1;
      nuevoPedido.indicadorEstado = 'A';
      nuevoPedido.usuarioRegistro = 'usuario-actual';

      return this.aplicarActualizacionesAPedido(nuevoPedido, updateDto);
    })
  );

  // 6. Guardar cambios
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

  // Producto desayuno
  if (updateDto.IdProductoDesayuno !== undefined) {
    if (updateDto.IdProductoDesayuno === null) {
      pedido.productoDesayuno = null;
    } else {
      const producto = await this.productoRepository.findOneBy({ idProducto: updateDto.IdProductoDesayuno });
      if (!producto) throw new BadRequestException(`Producto desayuno con ID ${updateDto.IdProductoDesayuno} no existe`);
      pedido.productoDesayuno = producto;
    }
  } else {
    pedido.productoDesayuno = null; // Si no viene, se elimina (estilo PUT)
  }

  // Producto almuerzo
  if (updateDto.IdProductoAlmuerzo !== undefined) {
    if (updateDto.IdProductoAlmuerzo === null) {
      pedido.productoAlmuerzo = null;
    } else {
      const producto = await this.productoRepository.findOneBy({ idProducto: updateDto.IdProductoAlmuerzo });
      if (!producto) throw new BadRequestException(`Producto almuerzo con ID ${updateDto.IdProductoAlmuerzo} no existe`);
      pedido.productoAlmuerzo = producto;
    }
  } else {
    pedido.productoAlmuerzo = null;
  }

  // Producto cena
  if (updateDto.IdProductoCena !== undefined) {
    if (updateDto.IdProductoCena === null) {
      pedido.productoCena = null;
    } else {
      const producto = await this.productoRepository.findOneBy({ idProducto: updateDto.IdProductoCena });
      if (!producto) throw new BadRequestException(`Producto cena con ID ${updateDto.IdProductoCena} no existe`);
      pedido.productoCena = producto;
    }
  } else {
    pedido.productoCena = null;
  }

  // Lugar entrega desayuno
  if (updateDto.IdLugarEntregaDesayuno !== undefined) {
    if (updateDto.IdLugarEntregaDesayuno === null) {
      pedido.lugarEntregaDesayuno = null;
    } else {
      const lugar = await this.lugarDestinoRepository.findOneBy({ idLugarDestino: updateDto.IdLugarEntregaDesayuno });
      if (!lugar) throw new BadRequestException(`Lugar entrega desayuno con ID ${updateDto.IdLugarEntregaDesayuno} no existe`);
      pedido.lugarEntregaDesayuno = lugar;
    }
  } else {
    pedido.lugarEntregaDesayuno = null;
  }

  // Lugar entrega almuerzo
  if (updateDto.IdLugarEntregaAlmuerzo !== undefined) {
    if (updateDto.IdLugarEntregaAlmuerzo === null) {
      pedido.lugarEntregaAlmuerzo = null;
    } else {
      const lugar = await this.lugarDestinoRepository.findOneBy({ idLugarDestino: updateDto.IdLugarEntregaAlmuerzo });
      if (!lugar) throw new BadRequestException(`Lugar entrega almuerzo con ID ${updateDto.IdLugarEntregaAlmuerzo} no existe`);
      pedido.lugarEntregaAlmuerzo = lugar;
    }
  } else {
    pedido.lugarEntregaAlmuerzo = null;
  }

  // Lugar entrega cena
  if (updateDto.IdLugarEntregaCena !== undefined) {
    if (updateDto.IdLugarEntregaCena === null) {
      pedido.lugarEntregaCena = null;
    } else {
      const lugar = await this.lugarDestinoRepository.findOneBy({ idLugarDestino: updateDto.IdLugarEntregaCena });
      if (!lugar) throw new BadRequestException(`Lugar entrega cena con ID ${updateDto.IdLugarEntregaCena} no existe`);
      pedido.lugarEntregaCena = lugar;
    }
  } else {
    pedido.lugarEntregaCena = null;
  }

  // Metadatos
  pedido.fechaModificacion = new Date().toISOString().split('T')[0];

  return pedido;
}




async actualizarEstadoPedido(
  idPedido: number, 
  updateDto: UpdateEstadoPedidoDto
): Promise<PedidoTrabajadorCliente> {
  // 1. Verificar que el pedido existe
  const pedido = await this.pedidoTrabajadorClienteRepository.findOneBy({ idPedido });
  
  if (!pedido) {
    throw new NotFoundException(`Pedido con ID ${idPedido} no encontrado`);
  }

  // 2. Actualizar el estado
  pedido.estadoPedido = updateDto.estadoPedido;
  
  // Formatear fecha manualmente para MySQL (formato: YYYY-MM-DD HH:MM:SS)
  const now = new Date();
  const mysqlFormattedDate = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  
  pedido.fechaModificacion = mysqlFormattedDate;

  // 3. Guardar y retornar
  return this.pedidoTrabajadorClienteRepository.save(pedido);
}

  ///////////////////


  // pedido-trabajador-cliente.service.ts

async obtenerPedidosActivosPorTrabajador(
  idTrabajador: number
): Promise<PedidoTrabajadorCliente[]> {
  return this.pedidoTrabajadorClienteRepository.find({
    where: {
      idTrabajador: idTrabajador,
      estadoPedido: 1,
      indicadorEstado: 'A'
    },
    relations: [
      'productoDesayuno',
      'productoAlmuerzo',
      'productoCena',
      'lugarEntregaDesayuno',
      'lugarEntregaAlmuerzo',
      'lugarEntregaCena'
    ],
    order: {
      fechaPedido: 'ASC' // Ordenar por fecha ascendente
    }
  });
}


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
