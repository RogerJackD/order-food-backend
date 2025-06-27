import { Module } from '@nestjs/common';
import { MercaderiaService } from './mercaderia.service';
import { MercaderiaController } from './mercaderia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mercaderia } from './entities/mercaderia.entity';

@Module({
  controllers: [MercaderiaController],
  providers: [MercaderiaService],
  imports: [
    TypeOrmModule.forFeature([ Mercaderia ])
  ]
})
export class MercaderiaModule {}
