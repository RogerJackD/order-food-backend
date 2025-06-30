import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { TrabajadorCliente } from 'src/trabajador-cliente/entities/trabajador-cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
    // 1. Validar si existen pedidos en el rango de fechas para este trabajador-cliente
    const fechaInicio = new Date(createDto.FechaIngreso);
    const fechaFin = new Date(createDto.FechaSalida);

    const pedidosExistentes = await this.pedidoTrabajadorClienteRepository.find({
      where: {
        idTrabajador: createDto.IdTrabajador,
        idCliente: createDto.IdCliente,
        fechaPedido: Between(
          fechaInicio.toISOString().split('T')[0],
          fechaFin.toISOString().split('T')[0],
        ),
      },
    });

    if (pedidosExistentes.length > 0) {
      const fechasExistentes = pedidosExistentes.map(p => p.fechaPedido);
      throw new BadRequestException({
        message: 'Ya existen pedidos para algunas fechas en el rango solicitado',
        trabajadorId: createDto.IdTrabajador,
        clienteId: createDto.IdCliente,
        fechasExistentes,
        rangoSolicitado: {
          desde: createDto.FechaIngreso,
          hasta: createDto.FechaSalida,
        },
      });
    }

    // 2. Si no hay conflictos, proceder a crear los nuevos pedidos
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
        idCliente: createDto.IdCliente 
      } as TrabajadorCliente;
      pedido.fechaPedido = fechaActual.toISOString().split('T')[0];
      
      // Asignación de productos (si existen)
      if (createDto.IdProductoDesayuno) {
        pedido.productoDesayuno = { idProducto: createDto.IdProductoDesayuno } as Producto;
      }
      // ... (resto de asignaciones igual que antes)

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
      .innerJoin('tc.trabajador', 'p')
      .select([
        'tc.idTrabajador',
        'p.idTipoDocumentoIdentidad',
        'p.numeroDocumentoIdentidad',
        'p.apellidoCompleto',
        'p.nombreCompleto',
        'p.razonSocial',
        'p.direccion',
      ])
      .where('p.numeroDocumentoIdentidad = :dni', { dni })
      .andWhere('p.idTipoDocumentoIdentidad = :tipoDoc', { tipoDoc: 2 })
      .andWhere('p.indicadorEstado = :estado', { estado: 'A' })
      .andWhere('tc.indicadorEstado = :estado', { estado: 'A' })
      .getRawOne();

    if (!trabajador) throw new BadRequestException('trabajador no econtrado');
    return { nombres: trabajador.p_RazonSocial };
  }

  // async createOrder(data: CreatePedidoTrabajadorClienteDto): Promise<any> {
  //   const nuevoPedido = {
  //     ...data,
  //     EstadoPedido: 1, // Estado inicial
  //   };

  //   console.log(nuevoPedido);
  //   return nuevoPedido;
  // }

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
