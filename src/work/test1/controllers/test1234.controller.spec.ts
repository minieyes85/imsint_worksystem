import { Test, TestingModule } from '@nestjs/testing';
import { Test1234Controller } from './test1234.controller';

describe('Test1234Controller', () => {
  let controller: Test1234Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Test1234Controller],
    }).compile();

    controller = module.get<Test1234Controller>(Test1234Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
