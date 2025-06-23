import { Module } from '@nestjs/common';
import { TrabajadorClienteService } from './trabajador-cliente.service';
import { TrabajadorClienteController } from './trabajador-cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorCliente } from './entities/trabajador-cliente.entity';

@Module({
  controllers: [TrabajadorClienteController],
  providers: [TrabajadorClienteService],
  imports: [
    TypeOrmModule.forFeature([TrabajadorCliente])
  ]
})
export class TrabajadorClienteModule {}
