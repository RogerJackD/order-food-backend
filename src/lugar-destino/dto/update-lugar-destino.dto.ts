import { PartialType } from '@nestjs/mapped-types';
import { CreateLugarDestinoDto } from './create-lugar-destino.dto';

export class UpdateLugarDestinoDto extends PartialType(CreateLugarDestinoDto) {}
