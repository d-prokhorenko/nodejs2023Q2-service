import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataBase } from 'src/db/db';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DataBase, TrackService, AlbumService],
})
export class ArtistModule {}
