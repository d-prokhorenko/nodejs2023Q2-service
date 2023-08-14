import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from 'src/track/track.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [AlbumController],
  imports: [DbModule],
  providers: [AlbumService, TrackService],
})
export class AlbumModule {}
