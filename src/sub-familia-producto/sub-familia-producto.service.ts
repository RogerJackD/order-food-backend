import { Injectable } from '@nestjs/common';
import { CreateSubFamiliaProductoDto } from './dto/create-sub-familia-producto.dto';
import { UpdateSubFamiliaProductoDto } from './dto/update-sub-familia-producto.dto';
import { SubFamiliaProducto } from './entities/sub-familia-producto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubFamiliaProductoService {

  constructor(
      @InjectRepository(SubFamiliaProducto)
      private readonly personaRepository: Repository<SubFamiliaProducto>,
    ) {}
  
    async obtenerTodos(): Promise<SubFamiliaProducto[]> {
      return this.personaRepository.find({
      relations: ['familiaProducto'],
    });;
    }




  create(createSubFamiliaProductoDto: CreateSubFamiliaProductoDto) {
    return 'This action adds a new subFamiliaProducto';
  }

  findAll() {
    return `This action returns all subFamiliaProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subFamiliaProducto`;
  }

  update(id: number, updateSubFamiliaProductoDto: UpdateSubFamiliaProductoDto) {
    return `This action updates a #${id} subFamiliaProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} subFamiliaProducto`;
  }
}
