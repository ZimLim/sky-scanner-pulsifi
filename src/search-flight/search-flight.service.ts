import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchFlightService {
  /*
    Needed SkyScanner API params:
      1) fromEntityId: string (required)
      2) toEntityId: string
      3) departDate (YYYY-MM-DD)
      4) returnDate (YYYY-MM-DD)
  */
  async findRoundtrip(
    departDate: string,
    returnDate: string,
    origin: string,
    destionation: string,
    grouped?: string
  ) {
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${origin}&toEntityId=${destionation}&departDate=${departDate}&returnDate=${returnDate}&sort=cheapest_first&grouped=${grouped ? grouped : false}`;
    const api_key = process.env.fastApiKey;

    // Break up into async/await 
    try {
      const req = await axios.get(url, {
        // Headers required by RapidAPI
        headers: {
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
          'x-rapidapi-key': api_key,
        },
      })
      const itineraries = req.data.data.itineraries
      const ret = {
        data: []
      }

      itineraries.map((itinerary) => {
          const price = itinerary.price.raw;
          const departure = itinerary.legs[0].departure;
          const full_info = itinerary;

          let information = {
            price,
            departure,
            full_info,
          };

          ret.data.push(information);
      })
      
      let flight_results;
      if(Boolean(grouped)){
        flight_results =  {
          weekday: [],
          weekend: []
        }
        ret.data.map((flight) => {
          const day = new Date (flight.departure).getDay()
          if(day === 6 || day === 0){
            flight_results.weekend.push(flight)
          }else{
            flight_results.weekday.push(flight)
          }  
        })
      }else{
        flight_results = ret.data.sort((a, b) => a.price - b.price)
      }
      return flight_results;
    }catch(err){
      return { status: err.status, message: err.message }
    }
  }
      
}
