import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchFlightService } from './search-flight.service';
import { IsDateString } from 'class-validator';

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
    1) Dates are not in correct format 
    2) Returning is earlier than departing
    3) ****Check SkyScanner docs**** Out of bounds value for the API (departing: only today onwards)
*/
 @Get('roundtrip')
 findRoundtrip(@Query('departing') departing: string, @Query('returning') returning: string, @Query('origin') origin: string){  
  return this.searchFlightService.findRoundtrip(departing, returning, origin);
 }
}
