import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
    ){}

    async obtenerTodos(): Promise<Rol[]> {
        return this.rolRepository.find();
    }

    
}
