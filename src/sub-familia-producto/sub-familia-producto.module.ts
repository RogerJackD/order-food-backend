import { Module } from '@nestjs/common';
import { SubFamiliaProductoService } from './sub-familia-producto.service';
import { SubFamiliaProductoController } from './sub-familia-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubFamiliaProducto } from './entities/sub-familia-producto.entity';

@Module({
  controllers: [SubFamiliaProductoController],
  providers: [SubFamiliaProductoService],
  imports: [
        TypeOrmModule.forFeature([ SubFamiliaProducto ])
  ]
})
export class SubFamiliaProductoModule {}
