import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchFlightModule } from './search-flight/search-flight.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    SearchFlightModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        // Limiting 10 requests per minute
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
