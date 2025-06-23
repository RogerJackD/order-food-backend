import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoTrabajadorClienteDto } from './dto/create-pedido-trabajador-cliente.dto';
import { UpdatePedidoTrabajadorClienteDto } from './dto/update-pedido-trabajador-cliente.dto';
import { TrabajadorCliente } from 'src/trabajador-cliente/entities/trabajador-cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoTrabajadorClienteService {
  constructor(
    @InjectRepository(TrabajadorCliente)
    private readonly trabajadorClienteRepository: Repository<TrabajadorCliente>,
  ) {}

  
  async findOne (dni: string) {
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
    
    if(!trabajador)
      throw new BadRequestException("trabajador no econtrado")
    return {nombres : trabajador.p_RazonSocial};
  }
  create(createPedidoTrabajadorClienteDto: CreatePedidoTrabajadorClienteDto) {
    return 'This action adds a new pedidoTrabajadorCliente';
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
