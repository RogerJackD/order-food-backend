import { Injectable } from '@nestjs/common';
import { CreateFamiliaProductoDto } from './dto/create-familia-producto.dto';
import { UpdateFamiliaProductoDto } from './dto/update-familia-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FamiliaProducto } from './entities/familia-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamiliaProductoService {
  constructor(
    @InjectRepository(FamiliaProducto)
    private readonly personaRepository: Repository<FamiliaProducto>,
  ) {}

  async obtenerTodos(): Promise<FamiliaProducto[]> {
    return this.personaRepository.find();
  }

  create(createFamiliaProductoDto: CreateFamiliaProductoDto) {
    return 'This action adds a new familiaProducto';
  }

  findAll() {
    return `This action returns all familiaProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familiaProducto`;
  }

  update(id: number, updateFamiliaProductoDto: UpdateFamiliaProductoDto) {
    return `This action updates a #${id} familiaProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} familiaProducto`;
  }
}
