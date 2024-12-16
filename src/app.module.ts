import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchFlightModule } from './search-flight/search-flight.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SearchFlightModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
