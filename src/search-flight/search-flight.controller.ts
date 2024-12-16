import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { SearchFlightService } from './search-flight.service';
import { RoundtripDto } from './dto/roundtrip.dto';

@Controller('search-flight')
export class SearchFlightController {
  constructor(private readonly searchFlightService: SearchFlightService) {}

  /* 
    Requirements:

    1) Require a GET method that takes in:
        1) Departure date (YYYY-MM-DD)
        2) Return date (YYYY-MM-DD)
    2) Results in JSON format
    3) Sort the result in ascending order based on the price (Cheapest to expensive)
    4) Group the result by weekend/weekday
    Returns all ROUNDTRIP flights which the dates given
  */

  /* 
  Error cases:
    1) Dates are not in correct format (Done)
    2) Returning is earlier than departing 
    3) ****Check SkyScanner docs**** Out of bounds value for the API (departing: only today onwards)
*/
  @Get('roundtrip')
  @UsePipes(new ValidationPipe({ transform: true }))
  findRoundtrip(@Query() query: RoundtripDto) {
    // Exception raised if the returning date is earlier than departure date
    if (new Date(query.returning) < new Date(query.departing)) {
      throw new BadRequestException(
        'Returning date must be after departing date',
      );
    }

    // Exception raised if departure date is in the past. RapidAPI requires future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(query.departing) < today) {
      throw new BadRequestException(
        'Departure date must be today or in the future',
      );
    }

    return this.searchFlightService.findRoundtrip(
      query.departing,
      query.returning,
      query.origin,
    );
  }
}
