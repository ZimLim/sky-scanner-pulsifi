import { Module } from '@nestjs/common';
import { SearchFlightService } from './search-flight.service';
import { SearchFlightController } from './search-flight.controller';

@Module({
  controllers: [SearchFlightController],
  providers: [SearchFlightService],
})
export class SearchFlightModule {}
