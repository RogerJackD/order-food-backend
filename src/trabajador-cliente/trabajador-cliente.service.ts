import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrabajadorCliente } from './entities/trabajador-cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrabajadorClienteService {
  constructor(
    @InjectRepository(TrabajadorCliente)
    private readonly rolRepository: Repository<TrabajadorCliente>,
  ) {}

  async obtenerTodos(): Promise<TrabajadorCliente[]> {
    return this.rolRepository.find();
  }
}
