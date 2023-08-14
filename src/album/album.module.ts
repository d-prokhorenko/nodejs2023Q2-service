import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DataBase } from 'src/db/db';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DataBase, TrackService],
})
export class AlbumModule {}
