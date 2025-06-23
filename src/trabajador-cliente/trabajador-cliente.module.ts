import { Module } from '@nestjs/common';
import { TrabajadorClienteService } from './trabajador-cliente.service';
import { TrabajadorClienteController } from './trabajador-cliente.controller';

@Module({
  controllers: [TrabajadorClienteController],
  providers: [TrabajadorClienteService],
})
export class TrabajadorClienteModule {}
