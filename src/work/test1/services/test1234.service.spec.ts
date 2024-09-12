import { Test, TestingModule } from '@nestjs/testing';
import { Test1234Service } from './test1234.service';

describe('Test1234Service', () => {
  let service: Test1234Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Test1234Service],
    }).compile();

    service = module.get<Test1234Service>(Test1234Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
