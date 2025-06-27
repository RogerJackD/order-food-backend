import { PartialType } from '@nestjs/mapped-types';
import { CreateFamiliaProductoDto } from './create-familia-producto.dto';

export class UpdateFamiliaProductoDto extends PartialType(CreateFamiliaProductoDto) {}
