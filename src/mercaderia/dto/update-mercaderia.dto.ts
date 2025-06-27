import { PartialType } from '@nestjs/mapped-types';
import { CreateMercaderiaDto } from './create-mercaderia.dto';

export class UpdateMercaderiaDto extends PartialType(CreateMercaderiaDto) {}
