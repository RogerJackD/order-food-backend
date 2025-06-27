import { Module } from '@nestjs/common';
import { LugarDestinoService } from './lugar-destino.service';
import { LugarDestinoController } from './lugar-destino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarDestino } from './entities/lugar-destino.entity';

@Module({
  controllers: [LugarDestinoController],
  providers: [LugarDestinoService],
  imports: [
    TypeOrmModule.forFeature([ LugarDestino ])
  ]
})
export class LugarDestinoModule {}
