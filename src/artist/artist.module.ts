import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataBase } from 'src/db/db';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DataBase],
})
export class ArtistModule {}
