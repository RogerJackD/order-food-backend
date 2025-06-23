import { Test, TestingModule } from '@nestjs/testing';
import { TrabajadorClienteService } from './trabajador-cliente.service';

describe('TrabajadorClienteService', () => {
  let service: TrabajadorClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrabajadorClienteService],
    }).compile();

    service = module.get<TrabajadorClienteService>(TrabajadorClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
