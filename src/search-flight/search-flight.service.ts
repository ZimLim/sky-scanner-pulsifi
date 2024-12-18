import { Injectable } from '@nestjs/common';
import axios from 'axios';

//Helper function
function groupBy(flights: [Object]) {
  flights.forEach((element) => {});
}

@Injectable()
export class SearchFlightService {
  /*
    Needed SkyScanner API params:
      1) fromEntityId: string (required)
      2) toEntityId: string
      3) departDate (YYYY-MM-DD)
      4) returnDate (YYYY-MM-DD)
  */
  findRoundtrip(
    departDate: string,
    returnDate: string,
    origin: string,
    destionation: string,
  ) {
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${origin}&toEntityId=${destionation}&departDate=${departDate}&returnDate=${returnDate}&sort=cheapest_first`;
    const api_key = process.env.fastApiKey;

    const req = axios
      .get(url, {
        // Headers required by RapidAPI
        headers: {
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
          'x-rapidapi-key': api_key,
        },
      })
      .then((response) => {
        const itineraries = response.data.data.itineraries;
        let ret = {
          data: [],
        };
        itineraries.forEach((itinerary) => {
          const price = itinerary.price.raw;
          const departure = itinerary.legs[0].departure;
          const full_info = itinerary;

          let information = {
            price,
            departure,
            full_info,
          };

          ret.data.push(information);
        });
        const sorted_flights = ret.data.sort((a, b) => a.price - b.price);

        return sorted_flights;
      })
      .catch((err) => {
        return { status: err.status, message: err.message };
      });

    return req;
  }
}
