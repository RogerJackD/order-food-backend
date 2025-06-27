import { PartialType } from '@nestjs/mapped-types';
import { CreateSubFamiliaProductoDto } from './create-sub-familia-producto.dto';

export class UpdateSubFamiliaProductoDto extends PartialType(CreateSubFamiliaProductoDto) {}
