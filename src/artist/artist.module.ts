import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [ArtistController],
  imports: [DbModule],
  providers: [ArtistService, TrackService, AlbumService],
})
export class ArtistModule {}
