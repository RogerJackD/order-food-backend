import { Injectable } from '@nestjs/common';
import { CreateLugarDestinoDto } from './dto/create-lugar-destino.dto';
import { UpdateLugarDestinoDto } from './dto/update-lugar-destino.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LugarDestino } from './entities/lugar-destino.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LugarDestinoService {
  constructor(
    @InjectRepository(LugarDestino)
    private readonly lugardestinoRepository: Repository<LugarDestino>,
  ) {}

  async obtenerTodos(): Promise<LugarDestino[]> {
    return this.lugardestinoRepository.find();
  }






  create(createLugarDestinoDto: CreateLugarDestinoDto) {
    return 'This action adds a new lugarDestino';
  }

  findAll() {
    return `This action returns all lugarDestino`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lugarDestino`;
  }

  update(id: number, updateLugarDestinoDto: UpdateLugarDestinoDto) {
    return `This action updates a #${id} lugarDestino`;
  }

  remove(id: number) {
    return `This action removes a #${id} lugarDestino`;
  }
}
