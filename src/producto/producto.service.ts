import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly personaRepository: Repository<Producto>,
  ) {}

  async obtenerTodos(): Promise<Producto[]> {
    return this.personaRepository.find();
  }

  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
