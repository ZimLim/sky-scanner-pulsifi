import { Injectable } from '@nestjs/common';
import { CreateSearchFlightDto } from './dto/create-search-flight.dto';
import { UpdateSearchFlightDto } from './dto/update-search-flight.dto';
import axios from 'axios';


@Injectable()
export class SearchFlightService {

  /*
    Needed SkyScanner API params:
      1) fromEntityId: string (required)
      2) departDate (YYYY-MM-DD)
      3) returnDate (YYYY-MM-DD)
      4) sort ("cheapestFirst") (is default option)
  */
  findRoundtrip(departDate: string, returnDate: string, origin: string){
  
    const url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${origin}&departDate=${departDate}&returnDate=${returnDate}`
    const api_key = process.env.fastApiKey

    const ret = axios.get(url,{
      headers: {
        "x-rapidapi-host": 'sky-scanner3.p.rapidapi.com',
        "x-rapidapi-key": api_key
      }
    }).then((response) => {
      return response.data.data.everywhereDestination.results
    }).catch((err) => {
      return {"status": err.status, "message": err.message}
    })
    
    return ret
  }
}
