import { Test, TestingModule } from '@nestjs/testing';
import { CrController } from './cr.controller';
import { CrService } from './cr.service';

describe('CrController', () => {
  let controller: CrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrController],
      providers: [CrService],
    }).compile();

    controller = module.get<CrController>(CrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
