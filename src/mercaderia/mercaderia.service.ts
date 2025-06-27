import { Injectable } from '@nestjs/common';
import { CreateMercaderiaDto } from './dto/create-mercaderia.dto';
import { UpdateMercaderiaDto } from './dto/update-mercaderia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mercaderia } from './entities/mercaderia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MercaderiaService {
  constructor(
    @InjectRepository(Mercaderia)
    private readonly personaRepository: Repository<Mercaderia>,
  ) {}

  async obtenerTodos(): Promise<Mercaderia[]> {
    return this.personaRepository.find({
      relations: ['subFamiliaProducto', 'producto'],
    });
  }

  create(createMercaderiaDto: CreateMercaderiaDto) {
    return 'This action adds a new mercaderia';
  }

  findAll() {
    return `This action returns all mercaderia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mercaderia`;
  }

  update(id: number, updateMercaderiaDto: UpdateMercaderiaDto) {
    return `This action updates a #${id} mercaderia`;
  }

  remove(id: number) {
    return `This action removes a #${id} mercaderia`;
  }
}
