import { Test, TestingModule } from '@nestjs/testing';
import { SearchFlightController } from './search-flight.controller';
import { SearchFlightService } from './search-flight.service';

describe('SearchFlightController', () => {
  let controller: SearchFlightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchFlightController],
      providers: [SearchFlightService],
    }).compile();

    controller = module.get<SearchFlightController>(SearchFlightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
