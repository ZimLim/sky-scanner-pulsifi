import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchFlightService {
  /*
    Needed SkyScanner API params:
      1) fromEntityId: string (required)
      2) departDate (YYYY-MM-DD)
      3) returnDate (YYYY-MM-DD)
  */
  findRoundtrip(departDate: string, returnDate: string, origin: string) {
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${origin}&departDate=${departDate}&returnDate=${returnDate}`;
    const api_key = process.env.fastApiKey;

    // Flights are sorted by **rawPrice** from cheapest to most expensive by default
    const ret = axios
      .get(url, {
        // Headers required by RapidAPI
        headers: {
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
          'x-rapidapi-key': api_key,
        },
      })
      .then((response) => {
        return response.data.data.everywhereDestination.results;
      })
      .catch((err) => {
        return { status: err.status, message: err.message };
      });
    return ret;
  }
}
