import { Test, TestingModule } from '@nestjs/testing';
import { SearchFlightService } from './search-flight.service';

describe('SearchFlightService', () => {
  let service: SearchFlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchFlightService],
    }).compile();

    service = module.get<SearchFlightService>(SearchFlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
