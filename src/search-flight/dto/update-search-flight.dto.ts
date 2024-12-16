import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchFlightDto } from './create-search-flight.dto';

export class UpdateSearchFlightDto extends PartialType(CreateSearchFlightDto) {}
