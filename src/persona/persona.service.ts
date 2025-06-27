import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async obtenerTodos(): Promise<Persona[]> {
    return this.personaRepository.find();
  }
}
