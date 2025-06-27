import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonaModule } from './persona/persona.module';
import { RolModule } from './rol/rol.module';
import { PedidoTrabajadorClienteModule } from './pedido-trabajador-cliente/pedido-trabajador-cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorClienteModule } from './trabajador-cliente/trabajador-cliente.module';
import { CommonModule } from './common/common.module';
import { MercaderiaModule } from './mercaderia/mercaderia.module';
import { FamiliaProductoModule } from './familia-producto/familia-producto.module';
import { ProductoModule } from './producto/producto.module';
import { LugarDestinoModule } from './lugar-destino/lugar-destino.module';
import { SubFamiliaProductoModule } from './sub-familia-producto/sub-familia-producto.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    PersonaModule, 
    RolModule, 
    PedidoTrabajadorClienteModule,
    TrabajadorClienteModule,
    CommonModule,
    MercaderiaModule,
    FamiliaProductoModule,
    ProductoModule,
    LugarDestinoModule,
    SubFamiliaProductoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
