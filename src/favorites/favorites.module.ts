import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataBase } from 'src/db/db';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [FavoritesController],
  imports: [DbModule],
  providers: [FavoritesService, ArtistService, AlbumService, TrackService],
})
export class FavoritesModule {}
