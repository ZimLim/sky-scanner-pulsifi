import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class RoundtripDto {
  // IsDateString enforces YYYY-MM-DD date format
  @IsDateString()
  departing: string;

  @IsDateString()
  returning: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsString()
  grouped?: string;
}
