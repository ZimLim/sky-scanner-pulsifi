import { IsDateString, IsString } from 'class-validator';

export class RoundtripDto {
  // IsDateString enforces YYYY-MM-DD date format
  @IsDateString()
  departing: string;

  @IsDateString()
  returning: string;

  @IsString()
  origin: string;
}