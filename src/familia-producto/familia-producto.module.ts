import { Module } from '@nestjs/common';
import { FamiliaProductoService } from './familia-producto.service';
import { FamiliaProductoController } from './familia-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamiliaProducto } from './entities/familia-producto.entity';

@Module({
  controllers: [FamiliaProductoController],
  providers: [FamiliaProductoService],

  imports: [
      TypeOrmModule.forFeature([ FamiliaProducto ])
    ]
})
export class FamiliaProductoModule {}
