import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly personaRepository: Repository<Producto>,
    private dataSource: DataSource
    
  ) {}


  async getAllByFamily(nombreFamiliaProducto: string): Promise<any[]> {
  const sql = `
    SELECT 
      P.NombreProducto,
      P.IdProducto
    FROM mercaderia M
    LEFT JOIN producto P ON P.IdProducto = M.IdProducto
    LEFT JOIN subfamiliaproducto SFP ON SFP.IdSubFamiliaProducto = M.IdSubFamiliaProducto
    LEFT JOIN familiaproducto FP ON FP.IdFamiliaProducto = SFP.IdFamiliaProducto
    WHERE FP.NombreFamiliaProducto = ?
      AND P.EstadoProducto = '1'
      AND FP.IndicadorEstado = 'A'
    ORDER BY M.CodigoMercaderia
  `;

  const resultado = await this.dataSource.query(sql, [nombreFamiliaProducto]);
  return resultado;
}






  async obtenerTodos(): Promise<Producto[]> {
    return this.personaRepository.find();
  }

  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
