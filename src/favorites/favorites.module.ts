import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataBase } from 'src/db/db';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    DataBase,
    ArtistService,
    AlbumService,
    TrackService,
  ],
})
export class FavoritesModule {}
