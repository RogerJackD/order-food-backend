import { Test, TestingModule } from '@nestjs/testing';
import { TrabajadorClienteController } from './trabajador-cliente.controller';
import { TrabajadorClienteService } from './trabajador-cliente.service';

describe('TrabajadorClienteController', () => {
  let controller: TrabajadorClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrabajadorClienteController],
      providers: [TrabajadorClienteService],
    }).compile();

    controller = module.get<TrabajadorClienteController>(TrabajadorClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
