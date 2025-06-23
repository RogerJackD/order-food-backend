import { Controller } from '@nestjs/common';
import { TrabajadorClienteService } from './trabajador-cliente.service';

@Controller('trabajador-cliente')
export class TrabajadorClienteController {
  constructor(private readonly trabajadorClienteService: TrabajadorClienteService) {}
}
